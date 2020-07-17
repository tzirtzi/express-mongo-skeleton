const express = require("express");
const router = express.Router();


function productRouter(Model, uploadService) {

  const upload = uploadService || require('../middleware/uploadFileFormidable');  // handle file uploading 
  const productService = require('../services/product.service')(Model, null);

  router.get("/", (req, res, next) => {
    productService.getProducts(req, res, next);
  });


  router.get("/:productId", (req, res, next) => {
    productService.getProduct(req, res, next);
  });


  router.post("/", upload, (req, res, next) => {
    productService.postProduct(req, res, next);
  });


  router.patch("/:productId", (req, res, next) => {
    productService.updateProduct(req, res, next);
  });


  router.delete("/:productId", (req, res, next) => {
    productService.deleteProduct(req, res, next);
  });

  return router;
}

module.exports = productRouter;
