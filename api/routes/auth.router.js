const express = require('express'),
    router = express.Router();
const controller = require('../controllers/auth.controller');

router.post('/login', async (req, res, next) => {
    await controller.login(req)
        .then(newToken => {
                res.status(200).json({
                    'z-jwt': newToken.toString(),
                    "z-status": 200
                })
            }
        )
        .catch(err => {
            console.log(err)
            next(err)
        });
});

router.post('/signup', async (req, res, next) => {
    await controller.signup(req)
        .then(r => {
            res.status(201).json({
                "z-status": 201
            })
        })
        .catch(err => {
            console.log("signup" + err)
            next(err)
        });
});

router.post('/check', async (req, res, next) => {
    await controller.check(req)
        .then(r => {
            res.status(parseInt(r)).json({
                "z-status": r
            })
        })
        .catch(err => {
            console.log(err)
            next(err)
        });
});

module.exports = router;
