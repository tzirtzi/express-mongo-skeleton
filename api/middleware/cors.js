module.exports = (req, res, next) => {
    res.header("Access-Control-Allow-Origin", process.env.CORS_ALLOW_ORIGIN || "*");
    res.header("Access-Control-Allow-Headers", process.env.CORS_ALLOW_HEADERS || "*" ); // older browser support
    res.header("Vary", "Access-Control-Request-Headers");
    next();
}