const promise = require('bluebird');

const options = {
  promiseLib: promise,
};

const pgp = require('pg-promise')(options);

const connectionString = 'postgres://admin:craftworks@192.168.99.100:5432/tasksdb';
const db = pgp(connectionString);

module.exports = db;
