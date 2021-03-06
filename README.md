# Test Automation with Testcafe 

In this project, the automation framework is created using Testcafe and Typescript. The tests can be executed locally and also in docker containers.

_The task is to automate the following scenarios_ -

1. Login journey for valid user credentials
2. Login journey for invalid/unregistered/empty user credentials
3. User signup to the application
   1. User should be able to register to the application successfully
   2. User should see the error messages on trying to register without filling the form
   3. User should see the error messages on trying to register by just filling the personal information
4. Search for product in the application
   1. User should be able to search for different products using the search bar
   2. User should be able to select a product from the search result drop down

### Built with

- [Testcafe] - library used to write e2e automation scripts which has it's own testing framework
- [Typescript] - programming language used to write the test scripts
- [Docker] - open source containerization platform to run tests in containers
- [Github Actions] - CI/CD tool to run the test scripts which provides quicker feedback
- [Log4js] - logging library used for log every action
- [Faker] - to generate fake form data
- [Allure] - to generate reports for the tests
- [Prettier] - a code formatter to make the code look neat and clean
- [eslint] - static code analyzer to identify problematic code

<!-- ### Structure of the framework -->

<!-- <img width="451" alt="Screenshot 2021-10-18 at 10 50 27 AM" src="https://user-images.githubusercontent.com/25933070/137673386-59130067-6eaf-4b3b-92eb-7fe3b1f3c563.png"> -->

### How to run the tests?

`Pre-requisites` -
Set the following environment variables for the test to execute

```sh
export EMAIL=<email>
export PASSWORD=<password>
export ENVIRONMENT=<environment> [STAGE, QA, DEV]
```

Remember to change the `export` above to `SET` if you're running a Windows machine.

##### The tests can be executed in both local machines and docker containers.

###### To execute tests in local machine -

```sh
# Get into the directory
$ cd automation
```

Install `YARN` using `npm install --global yarn`.

```sh
# Execute tests in CHROME browser
$ yarn test-chrome
# The above command executes - testcafe chrome ./src/tests/ --reporter html:./reports/report.html
```

```sh
# Execute tests in FIREFOX browser
$ yarn test-firefox
# The above command executes - testcafe firefox ./src/tests/ --reporter html:./reports/report.html
```

```sh
# Execute tests in both `CHROME`, `SAFARI`, `EDGE` and `FIREFOX` browsers in parallel
$ yarn test
# The above command executes - testcafe all ./src/tests/ --reporter html:./reports/report.html
# The tests are executed in parallel across the all the available browsers [chrome, firefox, safari, edge]
```

To run tests in HEADLESS mode, please use -

```sh
# Execute tests in CHROME headless browser
$ yarn test-chrome-headless
# The above command executes - testcafe chrome:headless ./src/tests/ --reporter html:./reports/report.html
```

```sh
# Execute tests in FIREFOX headless browser
$ yarn test-firefox-headless
# The above command executes - testcafe firefox:headless ./src/tests/ --reporter html:./reports/report.html
```

###### To execute tests in docker container -

Follow the steps in https://docs.docker.com/get-docker/ to install `Docker` in your machine.

The `Dockerfile` contains a shell script file which has the environment variables exported by default.

Add the following environment variables in `run-tests.sh` file

```shell
export EMAIL=<email>
export PASSWORD=<password>
export ENVIRONMENT=<environment> [STAGE, QA, DEV]
```

Execute the below commands -

```sh
# Build the docker container
$ docker build . -t e2e

# Run the docker container with the specific browser
# To execute tests in Chromium browser
$ docker run -e BROWSER=chromium -e FEATURE=login e2e   [for executing Login feature tests]
$ docker run -e BROWSER=chromium -e FEATURE=signup e2e   [for executing Signup feature tests]
$ docker run -e BROWSER=chromium -e FEATURE=search e2e   [for executing Search feature tests]

# To execute tests in Firefox browser
$ docker run -e BROWSER=firefox -e FEATURE=login e2e   [for executing Login feature tests]
$ docker run -e BROWSER=firefox -e FEATURE=signup e2e   [for executing Signup feature tests]
$ docker run -e BROWSER=firefox -e FEATURE=search e2e   [for executing Search feature tests]
```

#### `Dockerfile` -

<img width="443" alt="Screenshot 2021-10-17 at 4 43 30 PM" src="https://user-images.githubusercontent.com/25933070/137624952-10ba6334-19bc-4aa2-b5fa-332edeec7fc5.png">

#### `run-tests.sh` -

<img width="805" alt="Screenshot 2021-10-17 at 4 45 34 PM" src="https://user-images.githubusercontent.com/25933070/137625032-a6aaab1e-f693-419e-8a3a-d55944c38dd3.png">

### Reporting

`testcafe-html-reporter` is used to generate reports for the test execution results. The report is generated by passing the `--reporter` flag -

<img width="1151" alt="Screenshot 2021-10-17 at 6 21 29 PM" src="https://user-images.githubusercontent.com/25933070/137627939-4686d0eb-db15-45a8-ac2d-5315761ca165.png">

### Logging

`log4js` is used as the logging library for the framework. Logs are generated under the `log` directory of the project named as `debug.log`

The logger type is FileAppender, this covers the entire lifecycle of test execution and logs the details into the destination file as shown below -
<img width="1054" alt="Screenshot 2021-10-17 at 4 52 51 PM" src="https://user-images.githubusercontent.com/25933070/137625352-1cd3f962-8f58-41dd-be26-a7b7da74f7d5.png">

### CI/CD

`GitHub Actions` is the CI/CD tool to execute the tests. The pipeline will be triggered for every push made to the repo and also manually by the user.

<img width="648" alt="Screenshot 2021-10-17 at 5 09 09 PM" src="https://user-images.githubusercontent.com/25933070/137625813-3adfb6ae-1f50-40d8-be92-8a9d4f119a86.png">

<img width="1233" alt="Screenshot 2021-10-17 at 5 18 58 PM" src="https://user-images.githubusercontent.com/25933070/137626073-41e7f192-b0db-41fd-a3d9-7472698ae264.png">

The tests can be triggered on demand using `Trigger E2E tests on demand` workflow. We can select the browser of our choice as shown in the screenshot below.

<img width="1243" alt="Screenshot 2021-10-17 at 5 19 57 PM" src="https://user-images.githubusercontent.com/25933070/137626088-2c7a0214-13f0-4a78-9ec3-1092850fb914.png">

### Screenshots

Screenshots are captured when there is a test failure. They are available under the reports directory.

### Checklist

- [x] Logging
- [x] Screenshots for failed tests
- [x] Generating human-readable report
- [x] Generating random values for insignificant data
- [x] Encapsulation layers like test data and logic on pages
- [x] Ability to run tests in different browsers
- [x] Stability of the tests
- [x] CI/CD
- [x] Dockerized execution

### Nice to have

- Execution of tests in Cloud platforms like Browserstack can provide feedback across multiple platforms
- Map the test cases with test management tool like Zephyr using ZAPI
