
### # CLOUD ARCHITECTURE DECISIONS
<b>✓ URL of deployed frontend app: https://cmpe328tpa.d3mhhfv7ldo1qn.amplifyapp.com/</b><br><br>
<b>✓ Base URL of deployed public API: https://z763bh8bk7.execute-api.eu-central-1.amazonaws.com/v5</b><br>
<b>✓ Login endpoint:</b> {BASE_URL}/auth/login<br>
<b>✓ Signup endpoint:</b> {BASE_URL}/auth/signup<br>
<b>✓ Auth-check endpoint:</b> {BASE_URL}/auth/check<br>
<b>✓ Analyze endpoint:</b> {BASE_URL}/analyze

* <b>AWS Amplify:</b> We use Amplify service to serve our frontend application. Becuase the client app just needs to distribute static files obtained from production build. And it provides a handy, secure and scalable way.

* <b>AWS EC2:</b> The complete backend stack which was prepared with Docker-compose, is deployed to an AWS EC2 instance. We created the EC2 instance from a Docker integrated Amazon Machine Image with proper network configurations. However, the image did not have a Docker-compose tool out-of-box. So, we needed to set it up using CentOS compatible Docker-compose binaries. Also it was deployed on a Virtual Private Cloud subnet.

* <b>AWS REST API Gateway:</b> We used API Gateway service to ensure RESTful communications between
our clients and the backend. By that way, any of the users cannot know the real IP address of the AWS
EC2 instance (backend) and it is not possible to send request into Docker containers directly from the
user’s browser.

### # STEP BY STEP INSTRUCTIONS TO RUN THE APP ON LOCAL ENVIRONMENT

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
* ##### Visit "http://localhost:8080/", after successful setup of Docker containers and Vue app

### # INSTRUCTIONS TO TEST THE API WITH Unit-test methodology
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
