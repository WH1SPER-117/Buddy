const express = require('express');
const serviceProviderRouter = express.Router();
//insert models
const pendingServiceProvider = require("../Model/PendingServiceProviderModel")
const serviceProvider = require("../Model/ServiceProviderModel")

const serviceProviderController= require('../Controllers/ServiceProviderControllers');

//create route path
serviceProviderRouter.post("/register", serviceProviderController.addPendingServiceProvider);
serviceProviderRouter.post("/addServiceProvider", serviceProviderController.addServiceProvider);


module.exports = serviceProviderRouter;
