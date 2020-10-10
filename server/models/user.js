"use strict";
const Promise = require("bluebird");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { Model, STRING, Op } = require("sequelize");
const MailUtils = require("../../utils/MailUtils");
const verificationMailConfig = require("../../utils/config/mail")
  .VERIFICATION_MAIL;
const forgetPasswordConfig = require("../../utils/config/mail").FORGET_PASSWORD;
const notificationMailConfig = require("../../utils/config/mail")
  .NOTIFICATION_MAIL;
const SuccessMessage = require("../../utils/customMessage").SuccessMessage;
const ErrorMessage = require("../../utils/customMessage").ErrorMessage;
module.exports = (sequelize, DataTypes) => {
  class user extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  user.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      username: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          isEmail: true,
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
        },
        set: function (value) {
          var salt = bcrypt.genSaltSync(10);
          var hashed_password = bcrypt.hashSync(value, salt);
          this.setDataValue("password", hashed_password);
        },
      },
      phone: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          COUNT() {
            if (this.COUNT < 13) {
              throw new Error("Mobile number requires 12 digits");
            }
          },
        },
      },
      role: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: "consumer",
      },
      verification_code: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: Math.random().toString(36).slice(-8),
      },
      verified: {
        type: DataTypes.INTEGER,
        allowNull: true,
        defaultValue: 0,
      },
      reset_token: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: Math.random().toString(36).slice(-8),
      },
    },
    {
      sequelize,
      modelName: "user",
    }
  );

  user.createUser = (data) => {
    return new Promise((resolve, reject) => {
      console.log(data);
      user
        .findOne({ where: { email: data.email } })
        .then((findResult) => {
          if (findResult) {
            console.log(findResult);
            reject("EMAIL ALREADY EXISTS");
          }
        })
        .catch((err) => {
          console.log(err);
        });
      user
        .create(data)
        .then((result) => {
          MailUtils.sendEmail(
            verificationMailConfig.CONFIG,
            "verificationMail",
            "Verification Mail",
            {
              name: data.name,
              link:
                "Verification Link: http://localhost:3000/users/verify/?v=" +
                result.dataValues.verification_code,
            },
            data.email
          )
            .then((result) => {
              if (!result) {
                const errorMessage = new ErrorMessage(
                  ErrorMessage.CREATING_OBJECT_ERROR,
                  result
                );
                return Promise.reject(errorMessage);
              }
              const message = new SuccessMessage(
                SuccessMessage.CREATING_OBJECT_SUCCESS,
                result
              );
              resolve(message);
            })
            .catch((error) => {
              const errorMessage = new ErrorMessage(
                ErrorMessage.CREATING_OBJECT_ERROR,
                error
              );
              reject(errorMessage);
            });

          const successMessage = new SuccessMessage(
            SuccessMessage.CREATING_OBJECT_SUCCESS,
            "User created Successfully"
          );
          resolve(successMessage);
        })
        .catch((err) => {
          console.log(err);
          reject(err);
        });
    });
  };

  user.authenticate = (data) => {
    const _notFound = new Error("USER NOT FOUND");
    const _notCorrect = new Error("USER NAME OR PASSWORD NOT CORRECT");
    const _notVerified = "ACCOUNT NOT VERIFIED";
    return new Promise((resolve, reject) => {
      //check if email exists
      try {
        user
          .count({ where: { username: data.username } })
          .then((count) => {
            if (count == 0) {
              reject(_notFound);
            } else
              user
                .findOne({ where: { username: data.username } })
                .then((result) => {
                  //check if password matches

                  if (
                    !validatePassword(data.password, result.dataValues.password)
                  )
                    throw _notCorrect;
                  //get user data from jwt token provided
                  const payload = {
                    data: {
                      id: result.dataValues.id,
                      name: result.dataValues.name,
                      role: result.dataValues.role,
                    },
                  };
                  let expireDate = `${process.env.TOKEN_EXPIRE_DATE}`;

                  //remember me for token expire date to be set for a month
                  if (data.rememberMe) {
                    expireDate = "30d";
                  }
                  let token = jwt.sign(payload, process.env.TOKEN_SECRET, {
                    expiresIn: expireDate,
                  });

                  resolve({
                    name: result.dataValues.name,
                    token: token,
                    verified: result.dataValues.verified,
                    role: result.dataValues.role
                  });
                })
                .catch((err) => {
                  console.log(err);
                  reject(err);
                });
          })
          .catch((err) => {
            console.log(err);
            reject(err);
          });
      } catch (e) {
        reject(e);
      }
    });
  };

  user.getAll = () => {
    return new Promise((resolve, reject) => {
      user
        .findAll()
        .then((r) => {
          resolve(r);
        })
        .catch((err) => {
          reject(err);
        });
    });
  };

  user.getInfo = (id) => {
    return new Promise((resolve, reject) => {
      user
        .findOne({
          where: { id: id },
        })
        .then((r) => {
          resolve(r);
        })
        .catch((err) => {
          reject(err);
        });
    });
  };

  user.editUser = (data, id) => {
    return new Promise((resolve, reject) => {
      user
        .findOne({ where: { id: id } })
        .then((result) => {
          if (!result) {
            const errorMessage = new ErrorMessage(
              ErrorMessage.FETCHING_DATA_ERROR,
              "USER NOT FOUND"
            );
            reject(errorMessage);
          }
          user
            .update(data, { where: { id: id } })
            .then((result) => {
              MailUtils.sendEmail(
                notificationMailConfig.CONFIG,
                "notificationMail",
                "Account Updated Notification Mail",
                {
                  name: data.name,
                  action:
                    "you have updated your account information successfully",
                },
                data.email
              )
                .then((result) => {
                  if (!result) {
                    const errorMessage = new ErrorMessage(
                      ErrorMessage.FETCHING_DATA_ERROR,
                      result
                    );
                    return Promise.reject(errorMessage);
                  }
                  const successMessage = new SuccessMessage(
                    SuccessMessage.FETCHING_DATA_SUCCESS,
                    "User account updated Successfully"
                  );
                  resolve(successMessage);
                })
                .catch((error) => {
                  const errorMessage = new ErrorMessage(
                    ErrorMessage.UPDATING_OBJECT_ERROR,
                    error
                  );
                  reject(errorMessage);
                });
            })
            .catch((err) => {
              const errorMessage = new ErrorMessage(
                ErrorMessage.DATABASE_ERROR,
                err
              );
              reject(errorMessage);
            });
        })
        .catch();
    });
  };

  user.CheckResetToken = (resetToken) => {
    return new Promise((resolve, reject) => {
      user
        .findOne({ where: { reset_token: resetToken } })
        .then((result) => {
          //check if reset token exists
          if (!result) {
            const errorMessage = new ErrorMessage(
              ErrorMessage.OBJECT_NOT_FOUND,
              "RESET TOKEN NOT FOUND"
            );
            reject(errorMessage);
          }
          const successMessage = new SuccessMessage(
            SuccessMessage.FETCHING_DATA_SUCCESS,
            "RESET TOKEN FOUND"
          );
          resolve(successMessage);
        })
        .catch((err) => {
          const errorMessage = new ErrorMessage(
            ErrorMessage.OBJECT_NOT_FOUND,
            err
          );
          reject(errorMessage);
        });
    });
  };

  user.resetPassword = (data) => {
    return new Promise((resolve, reject) => {
      console.log(data);
      user
        .findOne({ where: { reset_token: data.reset_token } })
        .then((result) => {
          if (!result) {
            const errorMessage = new ErrorMessage(
              ErrorMessage.OBJECT_NOT_FOUND,
              "USER NOT FOUND"
            );
            reject(errorMessage);
          }

          if (data.password != data.confirmation_password) {
            const errorMessage = new ErrorMessage(
              ErrorMessage.INVALID_PASSWORD,
              "PASSWORDS DOESN'T MATCH"
            );
            reject(errorMessage);
          }

          user
            .update(
              {
                password: data.password,
                reset_token: Math.random().toString(32),
              },
              {
                where: {
                  id: result.dataValues.id,
                },
              }
            )
            .then((updateResult) => {
              //send notification mail to user
              MailUtils.sendEmail(
                notificationMailConfig.CONFIG,
                "notificationMail",
                "Account Updated Notification Mail",
                {
                  name: result.dataValues.name,
                  action: "you have updated your account password successfully",
                },
                result.dataValues.email
              )
                .then((result) => {
                  if (!result) {
                    const errorMessage = new ErrorMessage(
                      ErrorMessage.OBJECT_NOT_FOUND,
                      result
                    );
                    return Promise.reject(errorMessage);
                  }
                  const successMessage = new SuccessMessage(
                    SuccessMessage.UPDATING_OBJECT_SUCCESS,
                    "Password reset Successfully"
                  );
                  resolve(successMessage);
                })
                .catch((error) => {
                  const errorMessage = new ErrorMessage(
                    ErrorMessage.OBJECT_NOT_FOUND,
                    error
                  );
                  reject(errorMessage);
                });
            })
            .catch((err) => {
              const errorMessage = new ErrorMessage(
                ErrorMessage.UPDATING_OBJECT_ERROR,
                err
              );
              reject(errorMessage);
            });
        })
        .catch((err) => {
          const errorMessage = new ErrorMessage(
            ErrorMessage.DATABASE_ERROR,
            err
          );
          resolve(errorMessage);
        });
    });
  };

  user.forgetPassword = (email) => {
    return new Promise((resolve, reject) => {
      user
        .findOne({
          where: {
            email: email,
          },
        })
        .then((result) => {
          if (!result) {
            const errorMessage = new ErrorMessage(
              ErrorMessage.OBJECT_NOT_FOUND,
              "EMAIL NOT FOUND"
            );
            console.log(err);
            reject(errorMessage);
          }
          //send forget password mail to user
          MailUtils.sendEmail(
            forgetPasswordConfig.CONFIG,
            "forgetPassword",
            "Forget Password",
            {
              name: result.dataValues.name,
              link: `Reset Password Link: http://localhost:3000/reset/${result.dataValues.reset_token}`,
            },
            email
          )
            .then((result) => {
              if (!result) {
                const errorMessage = new ErrorMessage(
                  ErrorMessage.FETCHING_DATA_ERROR,
                  result
                );
                return Promise.reject(errorMessage);
              }
              const message = new SuccessMessage(
                SuccessMessage.FETCHING_DATA_SUCCESS,
                result
              );
              resolve(message);
            })
            .catch((error) => {
              console.log(err);
              const errorMessage = new ErrorMessage(
                ErrorMessage.FETCHING_DATA_ERROR,
                error
              );
              reject(errorMessage);
            });
        })
        .catch((err) => {
          console.log(err);
          const errorMessage = new ErrorMessage(
            ErrorMessage.DATABASE_ERROR,
            err
          );
          reject(errorMessage);
        });
    });
  };

  user.checkVerification = (verification_code) => {
    return new Promise((resolve, reject) => {
      user
        .findOne({
          where: { verification_code: verification_code },
        })
        .then((result) => {
          console.log(result.dataValues.id);
          //check if user account verified
          if (!result || result.dataValues.verified == 1) {
            const errorMessage = new ErrorMessage(
              ErrorMessage.INVALID_VERIFICATION_CODE,
              "VERIFICATION CODE NOT CORRECT"
            );
            reject(errorMessage);
          } else {
            user
              .update(
                {
                  verified: 1,
                },
                {
                  where: {
                    [Op.and]: [
                      {
                        id: result.dataValues.id,
                      },
                      {
                        verified: 0,
                      },
                    ],
                  },
                }
              )
              .then((updateResult) => {
                const successMessage = new SuccessMessage(
                  SuccessMessage.VERIFICATION_CODE_SUCCESS,
                  "ACCOUNT VERIFIED SUCCESSFULLY"
                );
                resolve(successMessage);
              })
              .catch((err) => {
                console.log(err);
                const errorMessage = new ErrorMessage(
                  ErrorMessage.UPDATING_OBJECT_ERROR,
                  "INVALID VERIFICATION CODE"
                );
                reject(errorMessage);
              });
          }
        })
        .catch((err) => {
          const errorMessage = new ErrorMessage(
            ErrorMessage.INVALID_VERIFICATION_CODE,
            err
          );
          reject(errorMessage);
        });
    });
  };

  user.deleteUser = (id) => {
    return new Promise((resolve, reject) => {
      user
        .findOne({ where: { id: id } })
        .then((result) => {
          if (!result) {
            console.log(result);
            reject("user NOT FOUND");
          }
          result
            .destroy()
            .then((result) => {
              resolve("user account updated Successfully");
            })
            .catch((error) => {
              reject(error);
            });
        })
        .catch((err) => {
          reject(err);
        });
    });
  };
  function validatePassword(password, storedPassword) {
    return bcrypt.compareSync(password, storedPassword);
  }

  return user;
};
