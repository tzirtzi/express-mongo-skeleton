
const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {
    res.status(200).json(
        req.userData ? { userdata: req.userData } : 'ok' 
    );
});

module.exports = router;