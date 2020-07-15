const mongoose = require("mongoose");

const Db = require("../data/mongooseData");
const Order = require("../models/order");
const Product = require("../models/product");


async function getOrders(req, res, next) {

  const queryCriteria = req.query.queryCriteria ? JSON.parse(req.query.queryCriteria) : null;
  const selectFields = req.query.fields;
  const sortCriteria = req.query.sort;
  const limitResults = req.query.limit ? parseInt(req.query.limit) : null;

  Db.findAllItems(Order, 'product', selectFields, queryCriteria, sortCriteria, limitResults)
    // .select("product quantity _id")
    // .populate('product', 'name')
    // .exec()
    .then(docs => {
      res.status(200).json({
        count: docs.length,
        orders: docs.map(doc => {
          return {
            _id: doc._id,
            product: doc.product,
            quantity: doc.quantity,
            request: {
              type: "GET",
              url: "http://localhost:3000/api/orders/" + doc._id
            }
          };
        })
      });
    })
    .catch(err => {
      res.status(500).json({
        error: err
      });
    });
}


async function postOrder(req, res, next) {

  Db.findItemById(Product, req.body.productId, null, null)
    .then(product => {
      if (!product) {
        return res.status(404).json({
          message: "Product not found"
        });
      }
      const order = new Order({
        _id: mongoose.Types.ObjectId(),
        quantity: req.body.quantity,
        product: req.body.productId
      });
      return order.save();
    })
    .then(result => {
      console.log(result);
      res.status(201).json({
        message: "Order stored",
        createdOrder: {
          _id: result._id,
          product: result.product,
          quantity: result.quantity
        },
        request: {
          type: "GET",
          url: "http://localhost:3000/api/orders/" + result._id
        }
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
}


async function getOrder(req, res, next) {

  const id = req.params.orderId;
  const selectFields = req.query.fields;

  Db.findItemById(Order, id, 'product', selectFields)
    .then(order => {
      if (!order) {
        return res.status(404).json({
          message: "Order not found"
        });
      }
      res.status(200).json({
        order: order,
        request: {
          type: "GET",
          url: "http://localhost:3000/api/orders"
        }
      });
    })
    .catch(err => {
      res.status(500).json({
        error: err
      });
    });
}


async function deleteOrder(req, res, next) {

  // Order.remove({ _id: req.params.orderId })
  //   .exec()
   Db.deleteItem(Order, req.params.orderId)
    .then(result => {
      res.status(200).json({
        message: "Order deleted",
        request: {
          type: "POST",
          url: "http://localhost:3000/api/orders",
          body: { productId: "ID", quantity: "Number" }
        }
      });
    })
    .catch(err => {
      res.status(500).json({
        error: err
      });
    });

}


module.exports = {
  getOrders,
  getOrder,
  postOrder,
  deleteOrder
}
