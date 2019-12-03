// Set up mongoose connection
const mongoose = require('mongoose');

//Set up db here
const dev_db_url = 'mongodb://127.0.0.1/my_database';

const mongoDB = process.env.MONGODB_URI || dev_db_url;

mongoose.connect(mongoDB, { useNewUrlParser: true });

mongoose.Promise = global.Promise;

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));