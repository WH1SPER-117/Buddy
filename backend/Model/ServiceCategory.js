const mongoose = require("mongoose");

const serviceSchema = new mongoose.Schema({
  serviceId: { type: String, required: true },
  serviceName: { type: String, required: true }
});

const serviceCategorySchema = new mongoose.Schema({
  categoryId: { type: String, required: true, unique: true },
  categoryName: { type: String, required: true },
  services: [serviceSchema] // Embedding services inside the category
});

module.exports = mongoose.model("ServiceCategory", serviceCategorySchema);
