const express = require("express");
const router = express.Router();

const dogController = require("../controllers/dogs");

const fileUpload = require("express-fileupload");

// Get temperaments
router.get("/temperaments", dogController.getTemperaments);
// Get filtered dogs
router.get("/filter", dogController.getFilteredDogs);
// Get dog by id
router.get("/:id", dogController.getDogById);
// Get all dogs
router.get("/", dogController.getDogs);
// Create new dog
router.post("/", dogController.createDog);
// Update dog image
router.put(
  "/:id",
  fileUpload({
    useTempFiles: true,
    tempFileDir: `${__dirname}/../../uploads`,
  }),
  dogController.updateDogImage
);

module.exports = router;
