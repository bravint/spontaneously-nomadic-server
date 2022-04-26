# Spontaneously Nomadic Server

## Introduction

An express server providing back-end functionality for https://github.com/bravint/spontaneously-nomadic-client.

I wanted this server to reflect everything I have learnt over the course of my 6 months at Boolean UK and to explore using typescript and third party npm packages - this includes getting familar with reading documentation, looking for solutions to problems and bugs in GitHub issues to name but a few.
## Current Project Status

MVP completed : 2 week project with 3 day sprints

*see upcoming features for next steps!*

## Stack Used:

**Passport.js**, **bcrypt**, **jsonwebtoken** : handles user authentication\
**Joi** : validate requests to the server\
**Prisma** : ORM to abstract SQL database requests\
**PostgreSQL** : database to store client data\
**TypeScript** : add type-checking to JavaScript

## Database 

## Install

Install dependencies: <code>npm install</code>\
Start server: <code>npm run dev</code>

*Optional*: Compile .ts files to /dist folder: <code>npm build</code>

## Upcoming features

Add abilty to have friends / followers to the server and client**