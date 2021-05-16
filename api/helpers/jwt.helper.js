const jwt = require('jsonwebtoken');

/**
 * @param { Request } req
 * @param { Response } res
 * @param { NextFunction } next
 * */
module.exports = {
    isAuthenticated: async (req, res, next) => {
        await jwt.verify(req.body.jwt, process.env.JWT_SIGNER_SECRET, (err, callback) => {
            if (err)
                next({ "code": 401 });
            else if (callback)
                next();
        })
    }
}