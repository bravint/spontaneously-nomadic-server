# Spontaneously Nomadic Server

## Introduction

An express server providing back-end functionality for https://github.com/bravint/spontaneously-nomadic-client.

Uses:

Passport.js with bcrypt, jsonwebtoken to handle user authentication\
Joi to validate requests to the server\
Prisma ORM to handle database requests\
PostgreSQL database to store client data\
TypeScript to provide type-checking

## Install

Install dependencies: <code>npm install</code>\
Start server: <code>npm run dev</code>

*Optional*: Compile .ts files to /dist folder: <code>npm build</code>
