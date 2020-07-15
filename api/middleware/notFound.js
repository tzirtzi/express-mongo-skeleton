module.exports = (req, res, next) => {
    let error = new Error('404 Requested resource not found {:-/o)');
    error.status = 404;
    next(error);
}