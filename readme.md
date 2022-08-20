# NodeFantasy 

An API that shows bin collections from Northumberland County Council

## Requirements

- [Docker](https://www.docker.com/)
- [NPM](https://www.npmjs.com) / [Yarn](https://yarnpkg.com)
- [nodemon](https://www.npmjs.com/package/nodemon)

## Installation

### _Development_

Follow the steps below to build and start the NodeJS server.

#### _Docker_

Build Docker image and start Docker container.
```
make build
make start
```

#### _NodeServer_

Install deps with Yarn then start NodeJS server.
```
yarn
yarn start
```

## Commands
```
yarn run start                 # Start NodeJS server
yarn run start:dev             # Start NodeJS server (Development)
yarn run lint                  # Run linter
yarn run lint:fix              # Run linter and fix formatting
yarn run test                  # Run tests with Jest
```

## Folder Structure
```
http                           # Items related to http such as Api / Controllers / Middleware
services                       # Service layer, usually entry way into business logic from controllers
utils                          # Utils
```

## Caveats

### Uncache searches are slow, or require multiple attempts because of failure?

Yeah, the Northumberland County Council has a habit of not loading correctly, being generally slow or just not loading as intended, so the web scraper may fail and require additional tries.
