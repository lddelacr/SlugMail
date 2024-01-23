# Slug Mail

#### Program Description
Slug Mail is a Google Mail style e-mail system, as a Single Page Full Stack Web App using the NERP Stack: Node.js, Express, React and PostgreSQL, plus Material-UI.
It allows users to view have a secure login, view their inbox, and read mail.

#### Program Instructions

To setup the development environment, navigate to the folder where you extracted the starter code and run
the following command:
$ npm install
This will take some time to execute as npm downloads and installs all the packages required to build the
assignment.
To start the database Docker container, in the backend folder run:
$ cd backend
$ docker-compose up -d
$ cd ..
The first time this runs it will take a while to download and install the backend Docker PostgreSQL image and
start the database service for your server to run against.
To start the frontend and backend dev servers, run the following command:
$ npm start
The frontend and backend servers can be run individually from their respective folders by running npm start
in separate console / terminal windows.
To run the linter against your API or UI code, run the following command in the backend or frontend folder:
$ npm run lint
To fix linter errors, run the following command in the backend or frontend folder:
$ npm run lint -- --fix
To run API tests run the following command in the backend folder:
$ npm test
To run UI tests run the following command in the frontend folder:
$ npm test
To run end-to-end tests run the following command in the e2e folder:
$ npm test
To stop the database, run:
$ cd backend
$ docker-compose down
$ cd ..
