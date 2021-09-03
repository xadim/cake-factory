# cake-factory

===================

Cake Factory Api is a powered by Node.js software that is RESTful api
application and supports MongoDB database.

## Dependencies Installation

`npm install`

## Packages installed:

**Express**: A lightweight Node.js web framework for spinning up RESTful APIs.
We will use this to handle routing in our backend API<br/> **body-parser**: A
middleware to parse incoming request inputs into our req.body object<br/>
**mongoose**: An object modeling tool for MongoDB. This will help create and
query our User schema<br/> **morgan**: HTTP request logger middleware for
Node.js. This will help us debug our API while in development<br/>
**validatorJS**: A validation library for handling input data validation<br/>
**nodemon**: is a tool that helps develop node.js based applications by
automatically restarting the node application when file changes in the directory
are detected <br/> **cloudinary**: Cloudinary Platform Powering Your Media ·
Image and Video API for Powerful Visual Experiences · Automatically optimize and
deliver images and videos · Create, <br/>**Mocha**: is a feature-rich JavaScript
test framework running on Node.js and in the browser, making asynchronous
testing simple and fun <br/> **Chai**: Chai is a BDD / TDD assertion library for
node and the browser that can be delightfully paired with any javascript testing
framework.<br/>**SuperTest**: HTTP assertions made easy.

## Development server

Run `nodemon server.js --inspect` for a dev server. Navigate to
`http://localhost:5000/`. The app will automatically reload if you change any of
the source files.

## Automated API test

An Automatic REST JSON API Testing system has been implemented using Mocha &
Chai. By simply running `mocha` should test the api endpoints.

## Demo Project

The project has been deployed on firebase and a demo can be seen here
https://cake-fact.firebaseapp.com/

## TODO / Features

1. Edit a Cake
2. Add multiple images
3. Auth
4. ...
