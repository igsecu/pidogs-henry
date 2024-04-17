const express = require("express");
const router = express.Router();

const dogController = require("../controllers/dogs");

// Get dog by id
router.get("/:id", dogController.getDogById);
// Get all dogs
router.get("/", dogController.getDogs);

module.exports = router;