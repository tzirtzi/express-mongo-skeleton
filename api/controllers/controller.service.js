//const { Model } = require("mongoose");

function Controller(Db, populateCollectionsController) {


    function getAll(req, res, next, routerHandler, populateCollectionsRouter) {

        const populateCollections = req.query.populate || populateCollectionsRouter || populateCollectionsController || null;
        const queryCriteria = req.query.queryCriteria ? JSON.parse(req.query.queryCriteria) : null;
        const selectFields = req.query.fields;
        const sortCriteria = req.query.sort;
        const limitResults = req.query.limit ? parseInt(req.query.limit) : null;

        function controllerHandler(DBcallPromise) {
            DBcallPromise
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
        const responseHandler = routerHandler || controllerHandler;

        responseHandler(
            Db.findAllItems(populateCollections, selectFields, queryCriteria, sortCriteria, limitResults)
        );

        /* The above code is similar to the following, only it allows to inject a function from router
            That provides a different res handler for specific -route level cases */
        // Db.findAllItems(populateCollections, selectFields, queryCriteria, sortCriteria, limitResults)
        //     .then(docs => {
        //         res.status(200).json(docs);
        //     })
        //     .catch(err => {
        //         console.log(err);
        //         res.status(500).json({
        //             error: err
        //         });
        //     });
    }


    function getById(req, res, next, routerHandler, populateCollectionsRouter) {

        const id = req.params.id;
        const populateCollections = req.query.populate || populateCollectionsRouter || populateCollectionsController || null;
        const selectFields = req.query.fields;


        function controllerHandler(DBcallPromise) {
            DBcallPromise
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
        const responseHandler = routerHandler || controllerHandler;

        responseHandler(
            Db.findItemById(id, populateCollections, selectFields)
        );
    }


    function postOne(req, res, next, routerHandler) {

        // if there is constructed object from previous step, use the constructed object
        //  otherwise default to req.body info (object will be constructed from req.body and saved)
        function DbCreateItem() {
            if (req.newItem) {
                return Db.createItem(req.newItem);
            } else {
                return Db.createItemFromProperties(req.body);
            }
        }

        function controllerHandler(DBcallPromise) {
            DBcallPromise
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
        const responseHandler = routerHandler || controllerHandler;

        responseHandler(
            DbCreateItem()
        );
    }


    function updateOne(req, res, next, routerHandler) {
        const id = req.params.id;
        const updatedProps = req.body;

        //do not allow updates on object id ( _id ) field!
        if (updatedProps["_id"]) {
            delete updatedProps["_id"];
        }

        function controllerHandler(DBcallPromise) {
            DBcallPromise
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
        const responseHandler = routerHandler || controllerHandler;

        responseHandler(
            Db.updateItem(updatedProps, id)
        );
    }

    function deleteOne(req, res, next, routerHandler) {
        const id = req.params.id;

        function controllerHandler(DBcallPromise) {
            DBcallPromise
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
        const responseHandler = routerHandler || controllerHandler;

        responseHandler(
            Db.deleteItem(id)
        );
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
