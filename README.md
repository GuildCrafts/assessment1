# Assessment 1


## notes for the project

- pre-build express app and PG connection
- provide dummy data (one set with only a few columns, a later set with all columns)
- they have to build all the views, with list/detail for contacts
- also update the schema to add columns
- stretch: extract more tables (mult. addresses, phone no.s)
- needs some front end behavioral foo (show/hide menu, additional details)
- feature idea: embed a google maps at the person’s address?
- show, create, and delete contacts

## To get this project running
1. `npm install`
1. `npm run load_schema` to create your `contacts` db and `contacts` table
1. `npm run load_contacts` to load 3 contacts into your `contacts` table
1. `npm start` to run (or `npm run start:dev` for `nodemon`)
