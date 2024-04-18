const request = require("supertest");
const app = require("../index");
const db = require("../src/db");

beforeAll(async () => {
  try {
    await db.sync({});
  } catch (error) {
    console.log(error.message);
  }
}, 30000);

afterAll((done) => {
  db.close();
  done();
});

describe("GET /api/dogs route -> get all dogs", () => {
  it("it should return 200 status code", async () => {
    const response = await request(app).get("/api/dogs");
    expect(response.status).toBe(200);
    //console.log(response.body);
  });
  it("it should return 400 status code -> page invalid", async () => {
    const response = await request(app).get("/api/dogs?page=hola");
    expect(response.status).toBe(400);
    expect(response.body.msg).toBe("Page must be a number");
  });
  it("it should return 404 status code -> page invalid", async () => {
    const response = await request(app).get("/api/dogs?page=33");
    expect(response.status).toBe(404);
    expect(response.body.msg).toBe("Page 33 not found!");
  });
  it("it should return 200 status code", async () => {
    const response = await request(app).get("/api/dogs?page=4");
    expect(response.status).toBe(200);
    //console.log(response.body);
  });
});

describe("GET /api/dogs/:id route -> get dog by id", () => {
  it("it should return 400 status code -> id invalid format", async () => {
    const response = await request(app).get("/api/dogs/1");
    expect(response.status).toBe(400);
    expect(response.body.msg).toBe("ID: 1 - Invalid format!");
  });
  it("it should return 404 status code -> dog not found", async () => {
    const response = await request(app).get(
      "/api/dogs/7cda48d4-0dad-4f09-99f9-d857f71dc289"
    );
    expect(response.status).toBe(404);
    expect(response.body.msg).toBe(
      "Dog with ID: 7cda48d4-0dad-4f09-99f9-d857f71dc289 not found!"
    );
  });
  it("it should return 200 status code -> get dog", async () => {
    const response = await request(app).get(
      "/api/dogs/97dbb5a4-4b2c-45a2-8879-1ac42e9514a9"
    );
    expect(response.status).toBe(200);
  });
});

describe("GET /api/dogs/temperament/:id route -> get dogs by temperament", () => {
  it("it should return 400 status code -> id invalid format", async () => {
    const response = await request(app).get("/api/dogs/temperament/1");
    expect(response.status).toBe(400);
    expect(response.body.msg).toBe("ID: 1 - Invalid format!");
  });
  it("it should return 404 status code -> temperament not found", async () => {
    const response = await request(app).get(
      "/api/dogs/temperament/97dbb5a4-4b2c-45a2-8879-1ac42e9514a9"
    );
    expect(response.status).toBe(404);
    expect(response.body.msg).toBe(
      "Temperament with ID: 97dbb5a4-4b2c-45a2-8879-1ac42e9514a9 not found!"
    );
  });
  it("it should return 200 status code -> get dogs", async () => {
    const response = await request(app).get(
      "/api/dogs/temperament/7cda48d4-0dad-4f09-99f9-d857f71dc289"
    );
    expect(response.status).toBe(200);
    //console.log(response.body);
  });
});

describe("GET /api/dogs/filter route -> get filtered dogs", () => {
  it("it should return 400 status code -> query parameter is missing", async () => {
    const response = await request(app).get("/api/dogs/filter");
    expect(response.status).toBe(400);
    expect(response.body.msg).toBe("Query parameter is missing!");
  });
  it("it should return 400 status code -> weight invalid", async () => {
    const response = await request(app).get("/api/dogs/filter?weight=hola");
    expect(response.status).toBe(400);
    expect(response.body.msg).toBe("Weight query must be ASC or DESC");
  });
  it("it should return 400 status code -> order invalid", async () => {
    const response = await request(app).get("/api/dogs/filter?order=hola");
    expect(response.status).toBe(400);
    expect(response.body.msg).toBe("Order query must be ASC or DESC");
  });
  it("it should return 200 status code -> get filtered dogs", async () => {
    const response = await request(app).get(
      "/api/dogs/filter?height=asc&name=can"
    );
    expect(response.status).toBe(200);
  });
});

describe("POST / route -> create new dog", () => {
  it("it should return 400 status code -> name is missing", async () => {
    const response = await request(app).post("/api/dogs").send({});
    expect(response.status).toBe(400);
    expect(response.body.msg).toBe("Name is missing");
  });
  it("it should return 400 status code -> name must be a string", async () => {
    const response = await request(app).post("/api/dogs").send({
      name: 1234,
    });
    expect(response.status).toBe(400);
    expect(response.body.msg).toBe("Name must be a string!");
  });
  it("it should return 400 status code -> min height is missing", async () => {
    const response = await request(app).post("/api/dogs").send({
      name: "New dog",
    });
    expect(response.status).toBe(400);
    expect(response.body.msg).toBe("min_height is missing!");
  });
  it("it should return 400 status code -> max height is missing", async () => {
    const response = await request(app).post("/api/dogs").send({
      name: "New dog",
      min_height: 1,
    });
    expect(response.status).toBe(400);
    expect(response.body.msg).toBe("max_height is missing!");
  });
  it("it should return 400 status code -> min weight is missing", async () => {
    const response = await request(app).post("/api/dogs").send({
      name: "New dog",
      min_height: 1,
      max_height: 2,
    });
    expect(response.status).toBe(400);
    expect(response.body.msg).toBe("min_weight is missing!");
  });
  it("it should return 400 status code -> max weight is missing", async () => {
    const response = await request(app).post("/api/dogs").send({
      name: "New dog",
      min_height: 1,
      max_height: 2,
      min_weight: 10,
    });
    expect(response.status).toBe(400);
    expect(response.body.msg).toBe("max_weight is missing!");
  });
  it("it should return 400 status code -> min life span is missing", async () => {
    const response = await request(app).post("/api/dogs").send({
      name: "New dog",
      min_height: 1,
      max_height: 2,
      min_weight: 10,
      max_weight: 20,
    });
    expect(response.status).toBe(400);
    expect(response.body.msg).toBe("min_life_span is missing");
  });
  it("it should return 400 status code -> max life span is missing", async () => {
    const response = await request(app).post("/api/dogs").send({
      name: "New dog",
      min_height: 1,
      max_height: 2,
      min_weight: 10,
      max_weight: 20,
      min_life_span: 1,
    });
    expect(response.status).toBe(400);
    expect(response.body.msg).toBe("max_life_span is missing");
  });
  it("it should return 201 status code -> max life span is missing", async () => {
    const response = await request(app).post("/api/dogs").send({
      name: "New dog",
      min_height: 1,
      max_height: 2,
      min_weight: 10,
      max_weight: 20,
      min_life_span: 1,
      max_life_span: 2,
      temperaments: [],
    });
    expect(response.status).toBe(201);
    console.log(response.body);
  });
});
