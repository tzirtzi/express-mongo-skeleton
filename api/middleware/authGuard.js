const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    try {
        //Get token from authorization bearer header
        const token = req.headers.authorization.split(" ")[1];
        const decoded = jwt.verify(token, process.env.JWT_KEY);
        req.userData = decoded;
        next();
    } catch (error) {
        return res.status(401).json({message: 'Auth failed'});
    }
};


// To use it in a route import in module
// and add it as first middleware in route definition ie:
/* 

1st USE *******************
const checkAuth = require('../middleware/check-auth');
...
router.post("/blabla", checkAuth, ... , (req, res, next) => { .. });


2nd USE *******************
router.post("/blabla", checkAuth, ... , (req, res, next) => {
    const { role } = req.user;

    if (role !== 'admin') {
        return res.sendStatus(403);
    }
    .....
*/
