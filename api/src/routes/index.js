const express = require("express");
const router = express.Router();

const dogsRouter = require("/dogs");

// Specify router root route
router.use("/dogs", dogsRouter);

module.exports = router;
