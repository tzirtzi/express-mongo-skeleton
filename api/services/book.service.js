const mongoose = require("mongoose");

/** 
 * Here is the place to handle any specific overrides 
 * Custom creation of Models or different res than normal controller res 
 * */
function bookService(Book, populateCollections) {

    const Db = require("../data/mongooseData")(Book);
    const Controller = require("../controllers/controller.service")(Db);


    // it is possible to pass a function for handling the response and error 
    // if we need to return a special result, that is different of what controller 
    // offers (controller res, err is common for all Model handlers of getAll)
    function getAll(req, res, next) {

        //resultFormatter need to be of similar to the controller function
        const getAllRouterHandler = function (DBCallPromise) {
            DBCallPromise.then(docs => {
                res.status(200).json({ count: docs.length, results: docs });
            })
                .catch(err => {
                    console.log(err);
                    res.status(500).json({
                        error: err
                    });
                });
        }

        Controller.getAll(req, res, next, getAllRouterHandler, populateCollections);
    }


    function getById(req, res, next) {

        Controller.getById(req, res, next, null, populateCollections);
    }

    // In order to handle custom object creation, we just need to pass the created object
    // in the request as req.newItem, controller will search for it, and use it if it exists
    // otherwise it will default to req.body creation ie: new Model({req.body}) 
    function postOne(req, res, next) {

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


    function updateOne(req, res, next) {

        Controller.updateOne(req, res, next);
    }


    function deleteOne(req, res, next) {

        Controller.deleteOne(req, res, next);
    }

    return {
        getAll,
        getById,
        postOne,
        updateOne,
        deleteOne
    }
}


module.exports = bookService;
