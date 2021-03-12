import Knex from "knex";

export const knex = require('knex')({
    client: 'mysql',
    connection: {
      host : '127.0.0.1',
      user : 'user',
      password : '123456',
      database : 'f1db'
    }
  });


  