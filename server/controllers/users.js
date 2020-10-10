const { user } = require("../models");
const renderResponseUtil = require("../../utils/RenderResponseUtil.js");
const Promise = require("bluebird");

module.exports = {
  getUserByID,
  editUser,
  createUser,
  deleteUser,
  getAllUsers,
  checkVerification,
  authenticate,
  resetPassword,
  checkResetToken,
  forgetPassword,
  getUserProfile,
  getUserByToken,
};

function authenticate(req, res) {
  return new Promise((resolve, reject) => {
    user
      .authenticate(req.body)
      .then((result) => {
        resolve(res.send(result));
      })
      .catch((err) => {
        console.log(err);
        reject(res.send("500", err.message));
      });
  });
}

function checkVerification(req, res) {
  console.log(req.query.v);
  user
    .checkVerification(req.query.v)
    .then((result) => {
      return res.send(result);
    })
    .catch((err) => {
      res.status("500").send(err);
    });
}

function getAllUsers(req, res) {
  user
    .getAll()
    .then((result) => {
      return res.send(result);
    })
    .catch((err) => {
      console.log(err);
      return res.status("500").send(err);
    });
}

function getUserByToken(req, res) {
  console.log(req.user.data.id);
  user
    .getInfo(req.user.data.id)
    .then((result) => {
      return res.send(result);
    })
    .catch((err) => {
      console.log(err);
      return res.status("500").send(err);
    });
}

function getUserByID(req, res) {
  user
    .getInfo(req.params.id)
    .then((result) => {
      return res.send(result);
    })
    .catch((err) => {
      return res.status("500").send(err);
    });
}

function getUserProfile(req, res) {
  console.log(req.user.data.id);
  user
    .getInfo(req.user.data.id)
    .then((result) => {
      return res.send(result);
    })
    .catch((err) => {
      return res.status("500").send(err);
    });
}

function checkResetToken(req, res) {
  return new Promise((resolve, reject) => {
    user
      .CheckResetToken(req.params.reset_token)
      .then((result) => {
        resolve(renderResponseUtil.sendResponse(req, res, result));
      })
      .catch((err) => {
        reject(renderResponseUtil.sendResponse(req, res, err));
      });
  });
}

function resetPassword(req, res) {
  return new Promise((resolve, reject) => {
    user
      .resetPassword(req.body)
      .then((result) => {
        resolve(renderResponseUtil.sendResponse(req, res, result));
      })
      .catch((err) => {
        reject(renderResponseUtil.sendResponse(req, res, err));
      });
  });
}

function forgetPassword(req, res) {
  console.log(req.body.email);
  return new Promise((resolve, reject) => {
    user
      .forgetPassword(req.body.email)
      .then((result) => {
        resolve(renderResponseUtil.sendResponse(req, res, result));
      })
      .catch((err) => {
        reject(renderResponseUtil.sendResponse(req, res, err));
      });
  });
}

function editUser(req, res) {
  user
    .editUser(req.body, req.params.id)
    .then((result) => {
      return res.send(result);
    })
    .catch((err) => {
      console.log(err);
      return res.status("500").send(err);
    });
}

function createUser(req, res) {
  user
    .createUser(req.body)
    .then((result) => {
      return res.send(result);
    })
    .catch((err) => {
      console.log(err);
      return res.status("500").send(err);
    });
}

function deleteUser(req, res) {
  user
    .deleteUser(req.params.id)
    .then((result) => {
      return res.send(result);
    })
    .catch((err) => {
      return res.status("500").send(err);
    });
}
