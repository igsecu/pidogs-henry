const express = require("express");
const router = express.Router();

const dogController = require("../controllers/dogs");

const fileUpload = require("express-fileupload");

// Get random dog
router.get("/random", dogController.getRandomDog);
// Get last comments
router.get("/comments/last", dogController.getLastComments);
// Get dog comments
router.get("/comments/:id", dogController.getDogComments);
// Get more views dogs
router.get("/views", dogController.getMoreViews);
// Get last dogs
router.get("/last", dogController.getLastDogs);
// Get temperaments
router.get("/temperaments", dogController.getTemperaments);
// Get filtered dogs
router.get("/filter", dogController.getFilteredDogs);
// Get dog by id
router.get("/:id", dogController.getDogById);
// Get all dogs
router.get("/", dogController.getDogs);
// Create new comment
router.post("/comment", dogController.createComment);
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
