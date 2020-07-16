//const { Model } = require("mongoose");

function Controller(Db, populateCollectionsController) {


    async function getAll(req, res, next, populateCollectionsRouter) {

        const populateCollections = req.query.populate || populateCollectionsRouter || populateCollectionsController || null;
        const queryCriteria = req.query.queryCriteria ? JSON.parse(req.query.queryCriteria) : null;
        const selectFields = req.query.fields;
        const sortCriteria = req.query.sort;
        const limitResults = req.query.limit ? parseInt(req.query.limit) : null;

        Db.findAllItems(populateCollections, selectFields, queryCriteria, sortCriteria, limitResults)
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


    async function getById(req, res, next, populateCollectionsRouter) {

        const id = req.params.id;
        const populateCollections = req.query.populate || populateCollectionsRouter || populateCollectionsController || null;
        const selectFields = req.query.fields;

        Db.findItemById(id, populateCollections, selectFields)
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


    async function postOne(req, res, next) {

        // if there is constructed object from previous step, use the constructed object
        //  otherwise default to req.body info (object will be constructed from req.body and saved)
        function DBcallPromise() {
            if (req.newItem) {
                return Db.createItem(req.newItem);
            } else {
                return Db.createItemFromProperties(req.body);
            }
        }

        //Db.createItem(req.newItem)
        DBcallPromise()
            .then(doc => {
                console.log(doc);
                res.status(201).json({
                    message: "Document Created Successfully",
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


    async function updateOne(req, res, next) {
        const id = req.params.id;
        const updatedProps = req.body;

        //do not allow updates on object id ( _id ) field!
        if (updatedProps["_id"]) {
            delete updatedProps["_id"];
        }

        Db.updateItem(updatedProps, id)
            .then(doc => {
                if (doc) {
                    res.status(200).json({
                        message: 'Document updated',
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


    async function deleteOne(req, res, next) {
        const id = req.params.id;

        Db.deleteItem(id)
            .then(doc => {
                if (doc) {
                    res.status(200).json({
                        message: 'Document deleted',
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


    return {
        getAll,
        getById,
        postOne,
        updateOne,
        deleteOne
    }
}

module.exports = Controller;
