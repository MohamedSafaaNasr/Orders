"use strict";
const { find } = require("lodash");
const { Model, Op } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class order extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  order.init(
    {
      OID: DataTypes.STRING,
      first_name: DataTypes.STRING,
      last_name: DataTypes.STRING,
      phone: DataTypes.STRING,
      country: DataTypes.STRING,
      order_status: DataTypes.STRING,
      item_price: DataTypes.DECIMAL,
      quantity: DataTypes.INTEGER,
      total_price: DataTypes.DECIMAL,
      pickup_time: DataTypes.DATE,
      delivery_time: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: "order",
    }
  );

  const getPagingData = (data, page, limit) => {
    const { count: totalItems, rows: orders } = data;
    const currentPage = page ? +page : 0;
    const totalPages = Math.ceil(totalItems / limit);

    return { totalItems, orders, totalPages, currentPage };
  };

  order.getAll = (page, limit, offset) => {
    return new Promise((resolve, reject) => {
      order
        .findAndCountAll({
          limit: limit != null ? limit : 100,
          offset: offset != null ? offset : 0,
        })
        .then((data) => {
          const response = getPagingData(data, page, limit);
          resolve(response);
        })
        .catch((err) => {
          reject({
            message:
              err.message || "Some error occurred while retrieving orders.",
          });
        });
    });
  };

  order.getOrderByFilter =(filter)=>{
    return new Promise((resolve, reject) => {
      order
      .findAll({where:filter})
      .then((result) => {
        resolve(result);
      })
      .catch((err) => {
        reject(err);
      });
    });
  }

  order.getEntry = (id) => {
    return new Promise((resolve, reject) => {
      order
        .findOne({ where: { id: id } })
        .then((result) => {
          resolve(result);
        })
        .catch((err) => {
          reject(err);
        });
    });
  };
  order.add = (data) => {
    return new Promise((resolve, reject) => {
      order
        .create(data)
        .then((result) => {
          result.msg = "order created successfully";
          resolve(result);
        })
        .catch((err) => {
          reject(err);
        });
    });
  };

  order.edit = (id, data) => {
    return new Promise((resolve, reject) => {
      order
        .findOne({ where: { id: id } })
        .then((searchResult) => {
          if (!searchResult) reject("object not found with this id:" + id);
          order
            .update(data, { where: { id: id } })
            .then((result) => {
              result.msg = "order updated successfully";
              resolve(result);
            })
            .catch((err) => {
              reject(err);
            });
        })
        .catch((err) => {
          reject(err);
        });
    });
  };

  order.deleteObject = (id) => {
    return new Promise((resolve, reject) => {
      order
        .findOne({ where: { id: id } })
        .then((searchResult) => {
          if (!searchResult) reject("object not found with this id:" + id);
          searchResult
            .destroy()
            .then((result) => {
              resolve("object destroyed successfully");
            })
            .catch((err) => {
              reject(err);
            });
        })
        .catch((err) => {
          reject(err);
        });
    });
  };

  return order;
};
