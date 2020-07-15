module.exports = (req, res, next) => {
    res.header('Access-Control-Allow-Methods', process.env.CORS_ALLOW_METHODS || 'GET, POST, PUT, PATCH, DELETE');
    return res.status(204).json({});
}