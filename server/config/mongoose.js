const mongoose = require('mongoose');
const util = require('util');
const debug = require('debug')('express-mongoose-es6-rest-api:index');

const config = require('./config');

// connect to mongo db
const dbusername=process.env.APP_MONGO_USER;
const dbpassword=process.env.APP_MONGO_PASS;
const db = process.env.APP_MONGO_DB;
var mongoUri = "mongodb://"+dbusername+":"+dbpassword+"@mongo/"+db
console.log("Connecting to: " +  mongoUri)
mongoose.connect(mongoUri, { useNewUrlParser: true, keepAlive: 1 });
mongoose.connection.on('error', () => {
  throw new Error(`unable to connect to database: ${mongoUri}`);
});

// print mongoose logs in dev env
if (config.MONGOOSE_DEBUG) {
  mongoose.set('debug', (collectionName, method, query, doc) => {
    debug(`${collectionName}.${method}`, util.inspect(query, false, 20), doc);
  });
}

