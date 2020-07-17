const express = require("express");
const router = express.Router();


function bookRouter(Model, injectedService, populateCollections) {

const bookService = require("../services/book.service")( Model, populateCollections );
const defaultRouter = require("./default.routes")(Model, bookService, populateCollections)

return defaultRouter;

// The above code is equivalent to the below: 

// router.get("/", (req, res, next) => {
//   bookService.getAll(req, res, next);
// });


// router.get("/:id", (req, res, next) => {
//   bookService.getById(req, res, next);
// });


// router.post("/", (req, res, next) => {
//   bookService.postOne(req, res, next);
// });


// router.patch("/:id", (req, res, next) => {
//   bookService.updateOne(req, res, next);
// });


// router.delete("/:id", (req, res, next) => {
//   bookService.deleteOne(req, res, next);
// });

//return router;
}

module.exports = bookRouter;
