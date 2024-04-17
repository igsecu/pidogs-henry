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
    console.log(response.body);
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
    console.log(response.body);
  });
});
