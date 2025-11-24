const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: {
    type: String, //dataType
    required: true, //validate
  },
  email: {
    type: String, //dataType
    required: true, //validate
  },
  contactNo: {
    type: String, //dataType
    required: true, //validate
  },
  address: {
    type: String, //dataType
    required: true, //validate
  },
  username: {
    type: String, //dataType
    required: true, //validate
  },
  password: {
    type: String, //dataType
    required: true, //validate
  },
});

module.exports = mongoose.model(
  "UserModel", //file name
  userSchema //function schema
);
