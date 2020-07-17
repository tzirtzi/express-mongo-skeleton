const mongoose = require("mongoose");

const Book = require("../models/book");
const Db = require("../data/mongooseData")(Book);
const Controller = require("../controllers/controller.service")(Db);


// Here is the place to handle any specific overrides 
// it would be nice if we could pass a function for handling the response and error 
// if we need an override in service level, that is dependent to specific Objects
async function getBooks(req, res, next) {

    const resultFormatter = function (Promise) {
        Promise.then(docs => {
                res.status(200).json({count:docs.length, results: docs});
            })
            .catch(err => {
                console.log(err);
                res.status(500).json({
                    error: err
                });
            });
    }

    Controller.getAll(req, res, next, null, resultFormatter);

}


async function getBook(req, res, next) {

    Controller.getById(req, res, next, null);
}


async function postBook(req, res, next) {

    const book = new Book({
        _id: new mongoose.Types.ObjectId(),
        title: req.body.title,
        genre: req.body.genre,
        author: req.body.author,
        read: false
    });

    req.newItem = book;

    Controller.postOne(req, res, next);
}


async function updateBook(req, res, next) {

    Controller.updateOne(req, res, next);
}


async function deleteBook(req, res, next) {

    Controller.deleteOne(req, res, next);
}


module.exports = {
    getBooks,
    getBook,
    postBook,
    updateBook,
    deleteBook
}
