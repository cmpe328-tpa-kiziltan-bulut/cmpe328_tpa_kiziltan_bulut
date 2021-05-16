const jwt = require('jsonwebtoken');
const User = require('../models/user.model');
const emailValidator = require('email-validator');
const hasher = require('bcrypt');
const hashComplexity = 5;

module.exports = {
    login: (req) =>
        new Promise(async (resolve, reject) => {
            const { email, pwd } = req.body;

            if (email === undefined || pwd === undefined
                || email === "" || pwd === "")
                reject({ "code": 400 });

            await User.find({ "email": email })
                .exec()
                .then(doc => {
                    if (doc.length !== 1)
                        reject({ "code": 404 })
                    else {
                        const
                            objectId = doc[0]._id,
                            hashedPwd = doc[0].password;

                        hasher.compare(pwd, hashedPwd, (err, isMatched) => {
                            if (err)
                                reject({ "code": 500 });

                            if (! isMatched)
                                reject({ "code": 401 })

                            jwt.sign({objectId}, process.env.JWT_SIGNER_SECRET, { expiresIn: "2 days" }, (err, newToken) => {
                                if (newToken) {
                                    resolve(newToken);
                                } else {
                                    reject({ "code": 500 })
                                }
                            });
                        })
                    }
                })
                .catch(err => {
                    reject({ "code": 500 });
                });
        }),
    signup: (req) =>
        new Promise((resolve, reject) => {
            const { fullName, email, pwd } = req.body;

            if ((fullName === undefined) || (email === undefined) ||
                (pwd === undefined) || !emailValidator.validate(email))
                reject({ "code": 400 });

            hasher.hash(pwd, hashComplexity, async (hash_err, hashedPwd) => {
                if (hash_err)
                    reject({ "code": 500 });

                await User.find({ "email": email })
                    .exec()
                    .then(async doc => {
                        if (doc.length === 0) {
                            await User.create({
                                "fullName": fullName,
                                "email": email,
                                "password": hashedPwd
                            })
                            .then(r => { if (r) resolve(201)})
                            .catch(db_err2 => {
                                console.log(db_err2);
                                reject({ "code": 500 });
                            });
                        } else {
                            reject({ "code": 400, "message": "User already exists" })
                        }
                    })
                    .catch(db_err1 => {
                        reject({ "code": 500 });
                    });
            });
        }),
    check: (req) =>
        new Promise((resolve, reject) => {
            jwt.verify(req.body.jwt, process.env.JWT_SIGNER_SECRET, (err, callback) => {
                if (err)
                    reject({ "code": 401 });
                else if (callback)
                    resolve(200);
            })
        })
}