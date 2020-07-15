const mongoose = require("mongoose");

const Db = require("../data/mongooseData");
const Product = require("../models/product");


async function getProducts(req, res, next) {

    const queryCriteria = req.query.queryCriteria ? JSON.parse(req.query.queryCriteria) : null;
    const selectFields = req.query.fields;
    const sortCriteria = req.query.sort;
    const limitResults = req.query.limit ? parseInt(req.query.limit) : null;

    Db.findAllItems(Product, null, selectFields, queryCriteria, sortCriteria, limitResults)
        .then(docs => {
            const response = {
                count: docs.length,
                products: docs.map(doc => {
                    return {
                        name: doc.name,
                        price: doc.price,
                        productImage: doc.productImage,
                        _id: doc._id,
                        request: {
                            type: "GET",
                            url: "http://localhost:3000/api/products/" + doc._id
                        }
                    };
                })
            };
            //   if (docs.length >= 0) {
            res.status(200).json(response);
            //   } else {
            //       res.status(404).json({
            //           message: 'No entries found'
            //       });
            //   }
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
}


async function getProduct(req, res, next) {
    const id = req.params.productId;
    const selectFields = req.query.fields;

    Db.findItemById(Product, id, null, selectFields)
        .then(doc => {
            console.log("From database", doc);
            if (doc) {
                res.status(200).json({
                    product: doc,
                    request: {
                        type: 'GET',
                        url: 'http://localhost:3000/api/products'
                    }
                });
            } else {
                res
                    .status(404)
                    .json({ message: "No valid entry found for provided ID" });
            }
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ error: err });
        });
}


async function postProduct(req, res, next) {
    const product = new Product({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        price: req.body.price,
        productImage: req.file.productImage.path
    });

    // product
    //     .save()
    Db.createItem(product)
        .then(result => {
            console.log(result);
            res.status(201).json({
                message: "Created product successfully",
                createdProduct: {
                    name: result.name,
                    price: result.price,
                    _id: result._id,
                    request: {
                        type: 'GET',
                        url: "http://localhost:3000/api/products/" + result._id
                    }
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


async function updateProduct(req, res, next) {
    const id = req.params.productId;
    const updatedProps = req.body;

    Db.updateItem(Product, updatedProps, id)
        .then(result => {
            res.status(200).json({
                message: 'Product updated',
                request: {
                    type: 'GET',
                    url: 'http://localhost:3000/api/products/' + id
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


async function deleteProduct(req, res, next) {
    const id = req.params.productId;
    Db.deleteItem(Product, id)
        .then(result => {
            res.status(200).json({
                message: 'Product deleted',
                request: {
                    type: 'POST',
                    url: 'http://localhost:3000/api/products',
                    body: { name: 'String', price: 'Number' }
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

module.exports = {
    getProducts,
    getProduct,
    postProduct,
    updateProduct,
    deleteProduct
}
