[![Build Status](https://travis-ci.org/OnyekachiSamuel/PostIt-App.svg)](https://travis-ci.org/OnyekachiSamuel/PostIt-App)
[![Coverage Status](https://coveralls.io/repos/github/OnyekachiSamuel/PostIt-App/badge.svg?branch=feat/151550754/feedback)](https://coveralls.io/github/OnyekachiSamuel/PostIt-App?branch=feat/151550754/feedback)
[![Code Climate](https://codeclimate.com/github/OnyekachiSamuel/PostIt-App/badges/gpa.svg)](https://codeclimate.com/github/OnyekachiSamuel/PostIt-App)


# PostIt App

## Introduction 
PostIt is a simple application that allows friends and colleagues create groups for notifications. This way one person can post notifications to everyone by sending a message once. The application allows people create accounts, create groups and add registered users to the groups, and then send messages out to these groups whenever they want.

The link to the **App** hosted on heruko is  [PostIt App](http://postico.herokuapp.com)


### API Documentation
- Check out the link [PostIt API Documentation](https://onyekachisamuel.github.io/slate) for a detailed walk through on the API and how to consume it.

## Installation

The below steps will guide you through setting up this project in your local machine and running some tests on the API
endpoints:

- Clone this repository https://github.com/OnyekachiSamuel/PostIt-App.git
- Navigate to your terminal and change your directory to the PostIt-App project directory.
- Run `npm install` to install the dependencies in the package.json file 
- Run `npm run start-dev` to start the app
- Run `gulp coverage` to run the server-side tests
- Run `npm test` to run the client-side tests
- Test for endpoints can be done with postman

## Key Features

### Authentication
- It uses JSON WEB TOKEN (JWT) for authentication
- It generates a token for user on successful login or account creation and returns it to the user
- It verifies the token to ensure the user is authenticated to allow access to protected endpoints

### Users
- It allows users to be created
- It allows users to create a group and add users to groups created
- It allows users to post message(s) to groups created
- It allows users to view all messages posted in the groups they belongs to
- It allows users to archive read messages in a group

### Search
- Users can search for registered users and add them to a group


## Technologies used
- JavaScript ES6 - Codes were written in javascript
- ReactJS - React is a JavaScript library for building user interfaces.
- NodeJS - Node.js is a JavaScript runtime built on Chrome's V8 JavaScript engine. Node.js uses an event-driven, non-blocking I/O model that makes it lightweight and efficient.
- PostgreSQL - PostgreSQL, often simply Postgres, is an object-relational database management system (ORDBMS) with an emphasis on extensibility and standards compliance.
- Sequelize - Sequelize is a promise-based ORM for Node.js v4 and up. It supports the dialects PostgreSQL, MySQL, SQLite and MSSQL and features solid transaction support, relations, read replication and more.

## Limitations
- Currently, authenticated user can only create a group but cannot delete a group created
- Users added to a group cannot be removed
- Read messages by users are not being archived.
- Real-time in-app notification for message posted to a group was not handled

## Frequently Asked Questions
- What is postIt app all about? 
postIt app is a simple application that allows friends and colleagues create groups for notifications purpose. With this app,
members in a group can interact with each other by posting their messages in the group.
- What are the steps on how to use the app?
 First, Sign up by creating a new account
 Once account is created, proceed to  create a group and add your prefered users to the group you created
 Then you can post message to the group you created for all members of the group.

## CONTRIBUTING

- Fork the repository from https://github.com/OnyekachiSamuel/PostIt-App
- Create your feature branch: git checkout -b my-new-feature
- Commit your changes: git commit -m 'Add some feature'
- Push to the branch: git push origin my-new-feature
- Submit a pull request to the **development** branch

Ensure your codes follow the [AirBnB Javascript Styles Guide](https://github.com/airbnb/javascript)

Ezeoke Onyekachi Samuel &copy; 2017 [MIT License](https://github.com/OnyekachiSamuel/PostIt-App/blob/development/LICENSE)
