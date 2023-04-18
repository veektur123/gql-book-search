const mongoose = require('mongoose');
require('dotenv').config()

mongoose.connect("mongodb+srv://veektur:YhtvgyF2ITVcHwlt@techblogwebsite.sjky7cf.mongodb.net/?retryWrites=true&w=majority", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false,
});

module.exports = mongoose.connection;
