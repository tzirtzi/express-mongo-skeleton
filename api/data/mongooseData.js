

// save one item
async function createItem(modelInstance) {
    return modelInstance
        .save()
}


// Update one item : updatedProperties = req.body in the router function
async function updateItem(Model, updatedProperties, id) {

	//do not allow updates on _id field!
	if (updatedProperties["_id"]) {
		delete updatedProperties["_id"];
	}

    const updateOps = {};
    for (const key in updatedProperties) {
        updateOps[key] = updatedProperties[key];
    }

    // By default, findoneAndUpdate returns the document as it was BEFORE the update
    // use option {returnOriginal: false} to return the updated document
    return Model
        .findOneAndUpdate({ _id: id }, { $set: updateOps }, { returnOriginal: false })
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
