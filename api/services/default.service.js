

function defaultService(Model, populateCollections) {

    const Db = require("../data/mongooseData")(Model);
    const Controller = require("../controllers/controller.service")(Db);
    

    function getAll(req, res, next) {
        Controller.getAll(req, res, next, null, populateCollections);
    }
    
    
    function getById(req, res, next) {
        Controller.getById(req, res, next, null, populateCollections);
    }
    
    
    function postOne(req, res, next) {
        Controller.postOne(req, res, next, null);
    }
    
    
    function updateOne(req, res, next) {
        Controller.updateOne(req, res, next, null);
    }
    
    
    function deleteOne(req, res, next) {
        Controller.deleteOne(req, res, next, null);
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
