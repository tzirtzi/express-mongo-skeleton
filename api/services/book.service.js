const mongoose = require("mongoose");

const Db = require("../data/mongooseData");
const Book = require("../models/book");


async function getBooks(req, res, next) {

    const queryCriteria = req.query.queryCriteria ? JSON.parse(req.query.queryCriteria) : null;
    const selectFields = req.query.fields;
    const sortCriteria = req.query.sort;
    const limitResults = req.query.limit ? parseInt(req.query.limit) : null;

    Db.findAllItems(Book, null, selectFields, queryCriteria, sortCriteria, limitResults)
        .then(docs => {
            res.status(200).json(docs);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
}


async function getBook(req, res, next) {

    const id = req.params.id;
    const selectFields = req.query.fields;

    Db.findItemById(Book, id, null, selectFields)
        .then(docs => {
            res.status(200).json(docs);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
}


async function postBook(req, res, next) {

    const book = new Book({
        _id: new mongoose.Types.ObjectId(),
        title: req.body.title,
        genre: req.body.genre,
        author: req.body.author,
        read: false
    });

    Db.createItem(book)
        .then(doc => {
            console.log(doc);
            res.status(201).json({
                message: "Created successfully",
                created: doc
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
}


async function updateBook(req, res, next) {
    const id = req.params.id;
    const updatedProps = req.body;

    Db.updateItem(Book, updatedProps, id)
        .then(doc => {
            if (doc) {
                res.status(200).json({
                    message: 'Product updated',
                    updated: doc
                });
            } else {
                res.status(404).json({ message: "No valid entry found for provided ID" });
            }
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
}


async function deleteBook(req, res, next) {
    const id = req.params.id;

    Db.deleteItem(Book, id)
        .then(doc => {
            if (doc) {
                res.status(200).json({
                    message: 'Product deleted',
                    deleted: doc
                });
            } else {
                res.status(404).json({ message: "No valid entry found for provided ID" });
            }
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
}


module.exports = {
    getBooks,
    getBook,
    postBook,
    updateBook,
    deleteBook
}
