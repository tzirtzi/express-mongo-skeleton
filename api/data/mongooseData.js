
function Db(Model) {


    // save one item
    async function createItem(modelInstance) {
        return modelInstance
            .save()
    }


    // Update one item : updatedProperties = req.body in the router function
    async function updateItem( updatedProperties, id) {

        //do not allow updates on _id field!
        if (updatedProperties["_id"]) {
            delete updatedProperties["_id"];
        }

        const updateOps = {};
        for (const key in updatedProperties) {
            updateOps[key] = updatedProperties[key];
        }

        // By default, findoneAndUpdate returns the document as it was BEFORE the update
        // use option {new: true} to return the updated document
        return Model
            .findOneAndUpdate({ _id: id }, { $set: updateOps }, { new: true })
            .exec()
    }


    // delete one item
    async function deleteItem(id) {
        return Model
            .findOneAndDelete({ _id: id })
            .exec()
    }


    //find one
    async function findOneItem(populateCollections, selectFields, QueryCriteria) {

        return Model
            .findOne(QueryCriteria)
            .populate(populateCollections)
            .select(selectFields)
            .exec();
    }


    //find by id
    async function findItemById(id, populateCollections, selectFields) {

        return Model
            .findById(id)
            .populate(populateCollections)
            .select(selectFields)
            .exec();
    }


    // find multiple
    async function findAllItems(populateCollections, selectFields, QueryCriteria, sortCriteria, limitNo) {

        return Model
            .find(QueryCriteria)
            .populate(populateCollections)
            .limit(limitNo)
            .sort(sortCriteria)
            .select(selectFields)
            .exec();
    }

    // Reveal Pattern
    return {
        createItem,
        updateItem,
        deleteItem,
        findOneItem,
        findItemById,
        findAllItems
    }

}

module.exports = Db;
