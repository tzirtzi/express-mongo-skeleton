const express = require("express");
const router = express.Router();

const bookService = require("../services/book.service");


router.get("/", (req, res, next) => {
  bookService.getBooks(req, res, next);
});


router.get("/:id", (req, res, next) => {
  bookService.getBook(req, res, next);
});


router.post("/", (req, res, next) => {
  bookService.postBook(req, res, next);
});


router.patch("/:id", (req, res, next) => {
  bookService.updateBook(req, res, next);
});


router.delete("/:id", (req, res, next) => {
  bookService.deleteBook(req, res, next);
});


module.exports = router;
