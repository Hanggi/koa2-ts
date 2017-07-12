const config = require('../config.json');
const mongoose = require('mongoose');

mongoose.connect(config.mongo_url, {useMongoClient: true,});
let db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
	console.log("mongo connected");
});