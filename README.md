# GraphQL Job Board

This project is a job board application that uses GraphQL for data management. It includes a React client and a Node.js server. The server uses Apollo Server to handle GraphQL requests and SQLite for data storage.

## Tech Stack

- **Frontend**: React, Apollo Client
- **Backend**: Node.js, Express, Apollo Server
- **Database**: SQLite

## Features

- Job listing
- Job creation
- Job deletion
- Job update
- Company listing
- User authentication

## Project Structure

The project is divided into two main directories: `client` and `server`.

### Client

The client-side code is located in the `client` directory. It includes the React components, GraphQL queries and mutations, and utility functions. The entry point of the application is `App.js`.

### Server

The server-side code is located in the `server` directory. It includes the GraphQL schema, resolvers, and database models. The entry point of the server is `server.js`.

## Setup

To set up the project, you need to install the dependencies for both the client and the server. You can do this by running `npm install` in both the `client` and `server` directories.

To start the server, navigate to the `server` directory and run `npm start`. The server will start on port 9000.

To start the client, navigate to the `client` directory and run `npm start`. The client will start on port 3000.

## Database

The database is SQLite and the schema is defined in `server/scripts/create-db.js`. You can run this script to create the database and populate it with some initial data.
