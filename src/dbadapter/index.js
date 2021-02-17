let dbservice = 'json';
if (process.env.DBSERVICE) dbservice = process.env.DBSERVICE;
let dburi = '';
if (process.env.DATABASE) dburi = process.env.DATABASE;

let db = {};
if (dbservice == 'json') db = require('./json')(dburi);
else if (dbservice == 'mongodb') db = require('./mongodb')(dburi);

module.exports = db;
