require('dotenv').config({path: `${__dirname}/.env`});
module.exports ={
  "development": {
    // "username": "sa",
    // "password": "P@ssw0rd",
    // "database": "cms_db",
    // host: "DESKTOP-JJG823A",
    // // port: "1434",  // <----------------The port number you copied
    // dialect: "mssql",
    // logging: false,
    // pool: {
    //   max: 5,
      
    //   min: 0,
    //   acquire: 30000,
    //   idle: 10000
    // },
    "username": process.env.DB_USERNAME,
    "password": process.env.DB_PASSWORD,
    "database": process.env.DB_DATABASE,
    "host": process.env.DB_HOST,
    "dialect": "postgres",
    "operatorsAliases": false,
    "jwtSecret":process.env.JWTSECRET,
    "jwtSession":{
        "session":false
    }
  },
  "test": {
    "username": process.env.DB_USERNAME,
    "password": process.env.DB_PASSWORD,
    "database": process.env.DB_DATABASE,
    "host": process.env.DB_HOST,
    "dialect": "postgres",
    "operatorsAliases": false,
    "jwtSecret":process.env.JWTSECRET,
    "jwtSession":{
        "session":false
    }
  },
  "production": {
    "username": process.env.DB_USERNAME,
    "password": process.env.DB_PASSWORD,
    "database": process.env.DB_DATABASE,
    "host": process.env.DB_HOST,
    "dialect": "postgres",
    "operatorsAliases": false,
    "jwtSecret":process.env.JWTSECRET,
    "jwtSession":{
        "session":false
    }
  }
}
