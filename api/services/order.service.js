const mongoose = require("mongoose");


const Order = require("../models/order");
const Product = require("../models/product");
const DbOrder = require("../data/mongooseData")(Order);
const DbProduct = require("../data/mongooseData")(Product);

async function getOrders(req, res, next) {

  const queryCriteria = req.query.queryCriteria ? JSON.parse(req.query.queryCriteria) : null;
  const selectFields = req.query.fields;
  const sortCriteria = req.query.sort;
  const limitResults = req.query.limit ? parseInt(req.query.limit) : null;

  DbOrder.findAllItems('product', selectFields, queryCriteria, sortCriteria, limitResults)
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
              url: `http://${req.headers.host}/api/orders/${doc._id}` 
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

  DbProduct.findItemById( req.body.productId, null, null)
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
          url: `http://${req.headers.host}/api/orders/${result._id}`
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

  DbOrder.findItemById( id, 'product', selectFields)
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
          url: `http://${req.headers.host}/api/orders`
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
   DbOrder.deleteItem( req.params.orderId)
    .then(doc => {
      res.status(200).json({
        message: "Order deleted",
        deleted: doc,
        request: {
          type: "POST",
          url: `http://${req.headers.host}/api/orders`,
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
