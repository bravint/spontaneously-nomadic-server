# Spontaneous Nomad Server

## Introduction

An express server for https://github.com/bravint/spontaneous-nomad-client

Uses 

Passport.js with bcrypt, jsonwebtoken to handle user authentication
Joi to validate requests to the server
Prisma ORM to handle database requests
PostgreSQL database to store client data

## Install

Install dependencies: <code>npm install</code>\
Start server: <code>npm run dev</code>

*Optional* Compile .ts files to /dist folder: <code>npm build</code>\