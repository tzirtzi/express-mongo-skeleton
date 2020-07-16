const express = require("express");
const router = express.Router();


function defaultRouter(Model, populateCollections) {

    const defaultService = require("../services/default.service")( Model, populateCollections );


    router.get("/", (req, res, next) => {
        defaultService.getAll(req, res, next);
    });
    
    
    router.get("/:id", (req, res, next) => {
        defaultService.getById(req, res, next);
    });
    
    
    router.post("/", (req, res, next) => {
        defaultService.postOne(req, res, next);
    });
    
    
    router.patch("/:id", (req, res, next) => {
        defaultService.updateOne(req, res, next);
    });
    
    
    router.delete("/:id", (req, res, next) => {
        defaultService.deleteOne(req, res, next);
    });

    return router;
}


module.exports = defaultRouter;
