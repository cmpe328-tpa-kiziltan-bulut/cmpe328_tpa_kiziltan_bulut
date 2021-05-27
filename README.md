### STEP BY STEP INSTRUCTIONS TO RUN THE APP ON LOCAL ENVIRONMENT

```bash
: '
Prerequisites:
✓ Node.js & NPM
✓ Docker
✓ Docker Compose
✓ No running services on ports 3000 and 8080 of local machine.
'
# 1) Open a new terminal screen in desired folder.

# 2) Pull the repository using Git clone:
$ git clone https://github.com/cmpe328-tpa-kiziltan-bulut/cmpe328_tpa_kiziltan_bulut.git

# 3) Go into the project’s root directory:
$ cd cmpe328_tpa_kiziltan_bulut/

# 4) Run the backend services using Docker Compose:
$ docker-compose up

# 5) Open a new terminal screen in the project’s root directory.

# 6) Go into the client folder:
$ cd client/

# 7) Use NPM to install the frontend app’s dependencies:
$ npm install

# 8) Run the client app using predefined NPM script:
$ npm run serve
```

### INSTRUCTIONS TO TEST THE API WITH Unit-test methodology
```bash
# 1) Open a new terminal screen in desired folder.

# 2) Pull the repository using Git clone:
$ git clone https://github.com/cmpe328-tpa-kiziltan-bulut/cmpe328_tpa_kiziltan_bulut.git

# 3) Go into the project’s “api” directory:
$ cd cmpe328_tpa_kiziltan_bulut/api/

# 4) Use NPM to install the dependencies:
$ npm install

# 5) Run the test script using NPM:
$ npm run test
```

### CLOUD ARCHITECTURE DECISIONS

* You can check the PDF documentation of the project for more information. // TODO ::
