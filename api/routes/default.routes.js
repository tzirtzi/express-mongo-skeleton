const express = require("express");
const router = express.Router();


function defaultRouter(Model, injectedService, populateCollections) {

    const defaultService = require("../services/default.service")( Model, populateCollections );
    const routerService = injectedService || defaultService ;


    router.get("/", (req, res, next) => {
        routerService.getAll(req, res, next);
    });
    
    
    router.get("/:id", (req, res, next) => {
        routerService.getById(req, res, next);
    });
    
    
    router.post("/", (req, res, next) => {
        routerService.postOne(req, res, next);
    });
    
    
    router.patch("/:id", (req, res, next) => {
        routerService.updateOne(req, res, next);
    });
    
    
    router.delete("/:id", (req, res, next) => {
        routerService.deleteOne(req, res, next);
    });

    return router;
}


module.exports = defaultRouter;
