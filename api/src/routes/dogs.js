const express = require("express");
const router = express.Router();

const dogController = require("../controllers/dogs");

const fileUpload = require("express-fileupload");

// Get filtered dogs
router.get("/filter", dogController.getFilteredDogs);
// Get dog by id
router.get("/:id", dogController.getDogById);
// Get dogs by temperament
router.get("/temperament/:id", dogController.getDogsByTemperament);
// Get all dogs
router.get("/", dogController.getDogs);
// Create new dog
router.post("/", dogController.createDog);

module.exports = router;
