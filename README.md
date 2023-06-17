# Gateway and Device Management Service

[![License](https://img.shields.io/badge/license-MIT-blue.svg)](https://opensource.org/licenses/MIT)

This project implements a RESTful service using Node.js and TypeScript for managing information about gateways and their associated devices. The service allows storing and retrieving data via JSON/HTTP and utilizes a MongoDB database with Mongoose for persistence.

## Key Features

- **Gateway Management**: Create gateways with unique serial numbers, human-readable names, and IPv4 addresses. Fields marked as "to be validated" are validated, and errors are returned for invalid inputs. Each gateway can have up to 10 peripheral devices.

- **Device Management**: Add or remove devices from gateways. Each device is identified by a UID, has a vendor, creation date, and status (online/offline). Multiple devices can be added to a gateway simultaneously by providing an array of devices in the request body.

- **Information Retrieval**: Retrieve information about all stored gateways (including their associated devices) or details of a single gateway.

- **Database Storage**: Gateway and device information is stored in a MongoDB database. Mongoose, an Object Data Modeling (ODM) library, is used for database interaction.

- **Error Handling**: Proper error handling and response generation for scenarios such as validation errors, duplicate gateways, exceeding device limits, and internal server errors.

## Setup

```
npm install
```

## Lint with ESLint

```
npm run lint
```

## Test

```
npm run test
```

## Development

```
npm run dev
```

API Server utilities:

* [morgan](https://www.npmjs.com/package/morgan)
  * HTTP request logger middleware for node.js
* [helmet](https://www.npmjs.com/package/helmet)
  * Helmet helps you secure your Express apps by setting various HTTP headers. It's not a silver bullet, but it can help!
* [dotenv](https://www.npmjs.com/package/dotenv)
  * Dotenv is a zero-dependency module that loads environment variables from a `.env` file into `process.env`
* [cors](https://www.npmjs.com/package/cors)
  * CORS is a node.js package for providing a Connect/Express middleware that can be used to enable CORS with various options.

Development utilities:

* [typescript](https://www.npmjs.com/package/typescript)
  * TypeScript is a language for application-scale JavaScript.
* [ts-node](https://www.npmjs.com/package/ts-node)
  * TypeScript execution and REPL for node.js, with source map and native ESM support.
* [nodemon](https://www.npmjs.com/package/nodemon)
  * nodemon is a tool that helps develop node.js based applications by automatically restarting the node application when file changes in the directory are detected.
* [eslint](https://www.npmjs.com/package/eslint)
  * ESLint is a tool for identifying and reporting on patterns found in ECMAScript/JavaScript code.
* [typescript-eslint](https://typescript-eslint.io/)
  * Tooling which enables ESLint to support TypeScript.
* [jest](https://www.npmjs.com/package/jest)
  * Jest is a delightful JavaScript Testing Framework with a focus on simplicity.
* [supertest](https://www.npmjs.com/package/supertest)
  * HTTP assertions made easy via superagent.

