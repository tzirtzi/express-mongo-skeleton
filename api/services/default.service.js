

function defaultService(Model, populateCollections) {

    const Db = require("../data/mongooseData")(Model);
    const Controller = require("../controllers/controller.service")(Db);
    

    async function getAll(req, res, next) {
    
        Controller.getAll(req, res, next, populateCollections);
    }
    
    
    async function getById(req, res, next) {
    
        Controller.getById(req, res, next, populateCollections);
    }
    
    
    async function postOne(req, res, next) {
        
        Controller.postOne(req, res, next);
    }
    
    
    async function updateOne(req, res, next) {
    
        Controller.updateOne(req, res, next);
    }
    
    
    async function deleteOne(req, res, next) {
        
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


module.exports = defaultService;
