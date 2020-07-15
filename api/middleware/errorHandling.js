/**Error Handling function */

module.exports = (req, res, next) => {

    res.status( error.status || 500 );
    //customize you error result here:
    res.json({
        error: { message: error.message }
    });
}
