# E-Butler  - orders

## FIRST STEPS TO RUN THE PROJECT
1- Install Postgres 9.x and above.

2- Install Sequelize-cli globally

3- Install Hmail server and configure mail to be used in configurations [Optional]

4- Configure .env files to be able to run server or deploy database.

5- run migration to create database and tables this will be covered in next section

6- run seeds to add data incase skipped step-3 to simulate with data and users.



## MIGRATION
1- Configure .env for database as already configured.

2- Create database using this command-line: **sequelize db:create**

3- Create Tables inside database using this command-line: **sequelize db:migrate**

4- Run seed data to create users and order mock data using this command-line: **sequelize db:seed:all**

## USABILITY
- Running backend using normal start please use: **npm start**

- Running backend using nodemon please use: **npm run dev**

- Running frontend using yarn please use: **yarn start**

- Building frontend development please use: **yarn run build:development**

- Building frontend staging please use: **yarn run build:staging**

##
### BACKEND API's COLLECTION WITH POSTMAN
[Postman Collection Public Link](https://www.getpostman.com/collections/5e360753d80d9b19d4db)
