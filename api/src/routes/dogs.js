const express = require("express");
const router = express.Router();

const dogController = require("../controllers/dogs");

// Get all dogs
router.get("/", dogController.getDogs);

module.exports = router;
