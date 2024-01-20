const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const db = {};

db.mongoose = mongoose;

db.user = require("./user.model");
db.brcStaking = require("./brcStaking.model");
db.odiStaking = require("./odiStaking.model");
db.aStaking = require("./aStaking.model");

module.exports = db;