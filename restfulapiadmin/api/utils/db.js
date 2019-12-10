// Set up mongoose connection
const mongoose = require('mongoose');

//Set up db here
const dev_db_url = 'mongodb+srv://admin:5yGZ58Vdv5FRzrrP@cluster0-j2jaq.mongodb.net/test?retryWrites=true&w=majority';

const mongoDB = process.env.MONGODB_URI || dev_db_url;

// mongoose.connect(mongoDB, { useNewUrlParser: true });
mongoose.connect(mongoDB, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log("MongoDB successfully connected")).catch(err => console.log(err));
mongoose.set('useCreateIndex', true);

mongoose.Promise = global.Promise;

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));