const express = require("express");
const app = express();

const PORT = process.env.PORT || 5000;

const db = require("./src/db");

const router = require("./src/routes/index");

const dogsController = require("./src/controllers/dogs");
const temperamentController = require("./src/controllers/temperaments");

// Body-Parser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Res Headers
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Credentials", "true");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
  next();
});

// Database models
const Dog = require("./src/models/Dog");
const Temperament = require("./src/models/Temperament");
const Comment = require("./src/models/Comment");
// Model associations
Dog.belongsToMany(Temperament, { through: "DogsTemperaments" });
Temperament.belongsToMany(Dog, { through: "DogsTemperaments" });

Dog.hasMany(Comment);
Comment.belongsTo(Dog);

// Router middleware
app.use("/api", router);

// Error catching endware
app.use((err, req, res, next) => {
  const status = err.status || 500;
  const message = err.message || err;
  res.status(status).json({
    statusCode: status,
    msg: message,
  });
});

// Initialized Express Server
db.sync({}).then(async () => {
  await temperamentController.getAllTemperamentsFromApi();
  await dogsController.getAllApi();
  app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}...`);
  });
});

module.exports = app;
