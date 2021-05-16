var express = require('express');
var router = express.Router();
const controller = require('../controllers/analyze.controller');
const { isAuthenticated } = require('../helpers/jwt.helper');

router.post('/', isAuthenticated, async (req, res, next) => {
    await controller.analyze(req)
        .then(r => {
            res.json(r)
        })
        .catch(err => next(err, req, res, next));
});

module.exports = router;
