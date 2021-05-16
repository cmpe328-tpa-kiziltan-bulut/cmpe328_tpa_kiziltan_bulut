const {fork} = require('child_process');
const fetch = require('node-fetch')

// Test environment variables of child process
let env_vars = Object.assign({}, process.env)
env_vars['DB_URI'] = "mongodb+srv://test_user:5UQVc59w78F4vjYz@testcluster.v44gw.mongodb.net/cmpe328?retryWrites=true&w=majority"
env_vars['API_PORT'] = 4001;
env_vars['JWT_SIGNER_SECRET'] = "jwtTestToken";
env_vars['NODE_ENV'] = 'test';

// Create a child process for testing
let app = fork("./main.js", {env: env_vars, silent: false});

let randomUserID = "";
let successfulTestCount = 0;

// If you retrieved "Ready" message from node.js child process, then you can execute tests
app.on('message', (msg) => {
    if (msg !== "Ready") return;
    console.log("Tests started. It is expected to be finished in 10 seconds...\n- X 0/10 tests... -")

    generateRandomUser();
    setTimeout(testSignup, 1000);
    setTimeout(testLogin, 5000);
    setTimeout(testChecker, 10000);
    setTimeout(testAnalyzer, 12000);

    setTimeout(EXIT, 15000)
})

let generateRandomUser = function () {
    randomUserID = Math.floor(Math.random() * 10).toString() + Date.now().toString();
}

let EXIT = function () {
    if (successfulTestCount === 10) console.log("\n* 10/10 passing...\n *** DONE: All tests are successful!");
    else console.log("Some test cases are failed: " + successfulTestCount + "/10 passed.");

    app.kill(0)
    process.exit(0)
}

let expectedToBe = (actual, expected) => {
    if (actual == expected) {
        ++successfulTestCount;
    } else {
        console.log(actual, " ", expected);
    }
}

let expectedNotToBe = (actual, expected) => {
    if (actual != expected) {
        ++successfulTestCount;
    } else {
        console.log(actual, " ", expected);
    }
}

//** Unit-test - HTTP setups

let retrieved_JWT_token = "_";

// AUTH - Signup Endpoint
let testSignup = function () {
    let testSignupBody = new URLSearchParams();
    testSignupBody.append("fullName", "Name Surname"); // todo :: use random int generator for name/email creation (use same item for both login and signup)
    testSignupBody.append("email", `user${randomUserID}@gmail.com`);
    testSignupBody.append("pwd", "1234");

    fetch("http://localhost:4001/api/v5/auth/signup", {
        method: 'post',
        headers: {"Content-Type": "application/x-www-form-urlencoded;charset=utf-8"},
        body: testSignupBody
    }).then(res => {
        expectedToBe(res.status, 201);

        console.log(res.status)

        res.json().then(data => {
            expectedToBe(data["z-status"], 201);

            console.log(data["z-status"])

            if (successfulTestCount === 2) console.log("\n* 2/10 passing...");
            else (console.log("Q"))

        }).catch(e => console.log(e)) // todo complete catch blocks
    }).catch(e => console.log(e))
}

// AUTH - Login Endpoint
let testLogin = function () {
    let testLoginBody = new URLSearchParams();
    testLoginBody.append("email", `user${randomUserID}@gmail.com`);
    testLoginBody.append("pwd", "1234");

    fetch("http://localhost:4001/api/v5/auth/login", {
        method: 'post',
        headers: {"Content-Type": "application/x-www-form-urlencoded;charset=utf-8"},
        body: testLoginBody
    }).then(res => {
        expectedToBe(res.status, 200)

        console.log(res.status)

        res.json().then(data => {
            retrieved_JWT_token = data["z-jwt"];
            expectedToBe(data["z-status"], 200)
            expectedNotToBe(retrieved_JWT_token, "_")


            console.log(data["z-status"])
            console.log(retrieved_JWT_token)

            if (successfulTestCount === 5) console.log("\n* 5/10 passing...")
            else (console.log("X"))

        }).catch(e => console.log(e))
    }).catch(e => console.log(e))
}

// AUTH - Check Endpoint
let testChecker = function () {
    let testAuthCheckBody = new URLSearchParams();
    testAuthCheckBody.append("jwt", retrieved_JWT_token);

    fetch("http://localhost:4001/api/v5/auth/check", {
        method: 'post',
        headers: {"Content-Type": "application/x-www-form-urlencoded;charset=utf-8"},
        body: testAuthCheckBody
    }).then(res => {

        console.log(res.status)

        expectedToBe(res.status, 200);
        res.json().then(data => {
            expectedToBe(data["z-status"], 200);

            console.log(data["z-status"])

            if (successfulTestCount === 7) console.log("\n* 7/10 passing...")
            else (console.log("Y"))

        }).catch(e => console.log(e));
    }).catch(e => console.log(e));
}

// File Analyzer Endpoint
let testAnalyzer = function () {
    let testAnalyzerBody = new URLSearchParams();
    testAnalyzerBody.append("jwt", retrieved_JWT_token);
    testAnalyzerBody.append("files", JSON.stringify({
        "content": "word word word word word baturalp"
    }));

    fetch("http://localhost:4001/api/v5/analyze", {
        method: 'post',
        headers: {"Content-Type": "application/x-www-form-urlencoded;charset=utf-8"},
        body: testAnalyzerBody
    }).then(res => {
        expectedToBe(res.status, 200)

        console.log(res.status)

        res.json().then(data => {

            console.log(data['word'] + "<== 5")
            console.log(data['baturalp'] + "<== 1")

            expectedToBe(data['word'], 5);
            expectedToBe(data['baturalp'], 1);
        }).catch(e => console.log(e));

    }).catch(e => console.log(e));
}

let exitWithMessage = _ => {
    console.log("One of the necessary tests failed. Exiting..!");
    process.exit(1);
}
