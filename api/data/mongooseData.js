
// save one item
async function createItem(modelInstance) {
    return modelInstance
        .save()
}

// Update one item : updatedProperties = req.body in the router function
async function updateItem(Model, updatedProperties, id) {
    const updateOps = {};
    for (const key in updatedProperties) {
        updateOps[key] = updatedProperties[key];
    }

    return Model.update({ _id: id }, { $set: updateOps })
        .exec()
}

// delete one item
async function deleteItem(Model, id) {
    return Model
        .findOneAndDelete({ _id: id })
        .exec()
}


//find one
async function findOneItem(Model, populateCollections, selectFields, QueryCriteria) {

    return Model
        .findOne(QueryCriteria)
        .populate(populateCollections)
        .select(selectFields)
        .exec();
}


//find by id
async function findItemById(Model, id, populateCollections, selectFields) {

    return Model
        .findById(id)
        .populate(populateCollections)
        .select(selectFields)
        .exec();
}


// find multiple
async function findAllItems(Model, populateCollections, selectFields, 
    QueryCriteria, sortCriteria, limitNo) {

    return Model
        .find(QueryCriteria)
        .populate(populateCollections)
        .limit(limitNo)
        .sort(sortCriteria)
        .select(selectFields)
        .exec();
}


module.exports = {
    createItem,
    updateItem,
    deleteItem,
    findOneItem,
    findItemById,
    findAllItems
}
