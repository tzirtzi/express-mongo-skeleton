module.exports = (req, res, next) => {
    res.header('Access-Control-Allow-Methods', process.env.CORS_ALLOW_METHODS || 'GET,HEAD,PUT,PATCH,POST,DELETE');
    // res.header('Allow', process.env.CORS_ALLOW_METHODS || 'GET,HEAD,PUT,PATCH,POST,DELETE');
    return res.status(204).json({});
}