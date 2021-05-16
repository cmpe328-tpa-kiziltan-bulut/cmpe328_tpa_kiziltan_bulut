#!/usr/bin/env node

/*
* Import dependencies
* */
const express = require('express');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const http = require('http');
const mongoose = require('mongoose');

DB_URI = process.env.DB_URI;
NODE_ENV = process.env.NODE_ENV || "test";

// Create Express app
const app = express();

app.use(logger('common')); // Logging middleware
app.use(express.json()); // Use JSON parse middleware
app.use(express.urlencoded({extended: true})); // Use HTTP request/response bodyparser middleware
app.use(cookieParser()); // Use cookie parser middleware

if (DB_URI === undefined) {
    console.log("ERROR :: MongoDB connection-string (URI) is undefined!");
    process.exit(1);
}

mongoose.connect(DB_URI,
    {
        useNewUrlParser: true,
        useFindAndModify: false,
        useUnifiedTopology: true
    })
    .catch(err => {
        console.log("DB_CONNECTION_ERROR :: " + err);
        process.exit(1);
    })
    .then(r => {
        console.log(` - Database connection established on port:${r.connections[0].port}
----------------------------------------------------------`);
        mongoose.Promise = global.Promise;
        if (process.env.NODE_ENV === "test")
            process.send("Ready");
    });


/*
* Import & use routers for route handling
* */
const authRouter = require('./routes/auth.router');
const analyzerRouter = require('./routes/analyze.router');
app.use('/api/v5/auth', authRouter);
app.use('/api/v5/analyze', analyzerRouter);

/**
 * 404 - Not Found Middleware
 * */
app.use((req, res, next) => {
    res.status(404).json({
        "z-status": 404
    })
})

/**
 * Custom General Error-Handler Middleware
 * */
app.use((errorCode, req, res, next) => {
    if (errorCode.message === undefined) {
        res.status(errorCode.code).json({
            "z-status": errorCode.code
        })
    } else {
        res.status(errorCode.code).json({
            "z-status": errorCode.code,
            "z-status-msg": errorCode.message
        })
    }
});

/**
 * Get port from environment or set default value (3000) to store in Express app
 * */
const port = process.env.API_PORT || '3000';
app.set('port', port);

/**
 * Create HTTP api by using stored port number
 */
let server = http.createServer(app);

server.listen(port);

/**
 * Print HTTP errors to the console
 * */
server.on('error', (err) =>
    console.log(`HTTP SERVER ERROR :: ${err}`));

/**
 * Print port number to the console when the API woke up
 * */
server.on('listening', () =>
    console.log(`* API is up on port ${server.address().port}...`));

module.exports = server
