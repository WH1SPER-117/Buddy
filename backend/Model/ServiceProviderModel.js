const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const AutoIncrement = require("mongoose-sequence")(mongoose);

//assign the added mongoose to a schema
//validations
const ServiceProviderSchema = new Schema({
    serviceProviderID: {
        type: Number,
        unique: true,
    },
    name: { type: String, required: true },
    nic: { type: String, required: true, unique: true },
    dob: { type: String, required: true },
    address: { type: String, required: true },
    phoneNo: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    serviceCategory: { type: String, required: true },
    service: { type: String, required: true },
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    createdDate: {
        type: String,
        default: Date.now, // Automatically sets the current date
      },
});

// Apply auto-increment to pendingServiceProviderID
ServiceProviderSchema.plugin(AutoIncrement, { inc_field: "serviceProviderID" });


//file name , function name
module.exports = mongoose.model('ServiceProvider',ServiceProviderSchema);
