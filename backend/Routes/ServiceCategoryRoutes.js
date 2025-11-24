const express = require("express");
const router = express.Router();
const serviceCategoryController = require("../Controllers/ServiceCategoryController");

router.post("/", serviceCategoryController.createCategory);
router.get("/", serviceCategoryController.getCategories);
router.post("/add-service", serviceCategoryController.addService);
router.delete("/:categoryId/:serviceId", serviceCategoryController.deleteService);

module.exports = router;
