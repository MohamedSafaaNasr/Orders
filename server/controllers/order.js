const { order } = require("../models");

module.exports = {
  getAllOrders,
  getOrderByFilter,
  getOrderById,
  addOrder,
  updateOrder,
  deleteOrder,
};

const getPagination = (page, size) => {
  page = page > 0 ? page - 1 : 0;
  const limit = size ? +size : 100;
  const offset = page ? page * limit : 0;

  return { limit, offset };
};

function getAllOrders(req, res) {
  const { page, size } = req.query;
  let { limit, offset } = getPagination(page, size);
  order
    .getAll(page, limit, offset)
    .then((result) => {
      return res.send(result);
    })
    .catch((err) => {
      console.log(err);
      return res.status("500").send(err);
    });
}

function getOrderByFilter(req,res){
  order.getOrderByFilter(req.body)
  .then((result) => {
    return res.send(result);
  })
  .catch((err) => {
    console.log(err);
    return res.status("500").send(err);
  });
}

function getOrderById(req, res) {
  order
    .getEntry(req.params.id)
    .then((result) => {
      return res.send(result);
    })
    .catch((err) => {
      console.log(err);
      return res.status("500").send(err);
    });
}

function addOrder(req, res) {
  order
    .add(req.body)
    .then((result) => {
      return res.send(result);
    })
    .catch((err) => {
      console.log(err);
      return res.status("500").send(err);
    });
}

function updateOrder(req, res) {
  order
    .edit(req.params.id, req.body)
    .then((result) => {
      return res.send(result);
    })
    .catch((err) => {
      console.log(err);
      return res.status("500").send(err);
    });
}

function deleteOrder(req, res) {
  order
    .deleteObject(req.params.id)
    .then((result) => {
      return res.send(result);
    })
    .catch((err) => {
      console.log(err);
      return res.status("500").send(err);
    });
}
