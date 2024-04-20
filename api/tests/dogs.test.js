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
    //console.log(response.body);
  });
});

/* describe("GET /api/dogs/:id route -> get dog by id", () => {
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
      "/api/dogs/020b0667-b81c-4823-b7cb-6c9623df4889"
    );
    expect(response.status).toBe(200);
  });
}); */

/* describe("GET /api/dogs/filter route -> get filtered dogs", () => {
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
  it("it should return 400 status code -> order invalid", async () => {
    const response = await request(app).get("/api/dogs/filter?temperament=1");
    expect(response.status).toBe(400);
    expect(response.body.msg).toBe("temperament: 1 - Invalid format!");
  });
  it("it should return 404 status code -> order invalid", async () => {
    const response = await request(app).get(
      "/api/dogs/filter?temperament=0e88bde5-a5a9-4040-a7c7-ed94562baabb"
    );
    expect(response.status).toBe(404);
    expect(response.body.msg).toBe(
      "Temperament with ID: 0e88bde5-a5a9-4040-a7c7-ed94562baabb not found!"
    );
  });
  it("it should return 200 status code -> get filtered dogs", async () => {
    const response = await request(app).get(
      "/api/dogs/filter?height=asc&name=can&temperament=ad65dd12-fa91-462e-9026-9539e38af2d9"
    );
    expect(response.status).toBe(200);
  });
}); */

describe("POST / route -> create new dog", () => {
  /*  it("it should return 400 status code -> name is missing", async () => {
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
  }); */
  /* it("it should return 201 status code -> max life span is missing", async () => {
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
  }); */
});

describe("PUT /:id route -> update dog image", () => {
  /*  it("it should return 400 status code -> id invalid format", async () => {
    const response = await request(app).put("/api/dogs/1");
    expect(response.status).toBe(400);
    expect(response.body.msg).toBe("ID: 1 - Invalid format!");
  });
  it("it should return 404 status code -> dog no found", async () => {
    const response = await request(app).put(
      "/api/dogs/46c7cf19-e6e7-47da-8523-14ee2407c120"
    );
    expect(response.status).toBe(404);
    expect(response.body.msg).toBe(
      "Dog with ID: 46c7cf19-e6e7-47da-8523-14ee2407c120 not found!"
    );
  });
  it("it should return 400 status code -> image file is missing", async () => {
    const response = await request(app).put(
      "/api/dogs/a549b781-d022-45a2-9aeb-137f5018166f"
    );
    expect(response.status).toBe(400);
    expect(response.body.msg).toBe("Image file is missing!");
  });
  it("it should return 400 status code -> file type not allowed", async () => {
    const response = await request(app)
      .put("/api/dogs/a549b781-d022-45a2-9aeb-137f5018166f")
      .attach("image", `${__dirname}/files/file.txt`);
    expect(response.status).toBe(400);
    expect(response.body.msg).toBe(
      "File format not allowed! Only JPG or PNG..."
    );
  });
  it("it should return 400 status code -> file size not support", async () => {
    const response = await request(app)
      .put("/api/dogs/a549b781-d022-45a2-9aeb-137f5018166f")
      .attach("image", `${__dirname}/files/heavyimage.jpg`);
    expect(response.status).toBe(400);
    expect(response.body.msg).toBe("File must be up to 2mb!");
  }); */
  /*  it("it should return 200 status code -> image updated", async () => {
    const response = await request(app)
      .put("/api/dogs/a549b781-d022-45a2-9aeb-137f5018166f")
      .attach("image", `${__dirname}/files/avatar1.png`);
    expect(response.status).toBe(200);
    console.log(response.body);
  }); */
});

/* describe("GET /temperaments route -> get all temperaments", () => {
  it("it should return 200 status code -> get temperaments", async () => {
    const response = await request(app).get("/api/dogs/temperaments");
    expect(response.status).toBe(200);
  });
}); */

/* describe("GET /last route -> get last dogs", () => {
  it("it should return 200 status code -> get last dogs", async () => {
    const response = await request(app).get("/api/dogs/last");
    expect(response.status).toBe(200);
  });
}); */

/* describe("GET /more route -> get more viewed dogs", () => {
  it("it should return 200 status code -> get more viewed dogs", async () => {
    const response = await request(app).get("/api/dogs/views");
    expect(response.status).toBe(200);
  });
}); */

/* describe("POST /comment route -> create new comment", () => {
  it("it should return 400 status code -> dogId is missing", async () => {
    const response = await request(app).post("/api/dogs/comment").send({
      text: "Hola",
    });
    expect(response.status).toBe(400);
    expect(response.body.msg).toBe("dogId is missing");
  });
  it("it should return 400 status code -> dogId invalid format", async () => {
    const response = await request(app).post("/api/dogs/comment").send({
      text: "Hola",
      dogId: 1,
    });
    expect(response.status).toBe(400);
    expect(response.body.msg).toBe("dogId: 1 - Invalid format!");
  });
  it("it should return 404 status code -> dog not found", async () => {
    const response = await request(app).post("/api/dogs/comment").send({
      text: "Hola",
      dogId: "07dc9be9-7359-4f03-b0df-07794806aa25",
    });
    expect(response.status).toBe(404);
    expect(response.body.msg).toBe(
      "Dog with ID: 07dc9be9-7359-4f03-b0df-07794806aa25 not found!"
    );
  });
  it("it should return 400 status code -> text is missing", async () => {
    const response = await request(app).post("/api/dogs/comment").send({
      dogId: "b476ac52-7dbf-4fae-a46e-502f257b6304",
    });
    expect(response.status).toBe(400);
    expect(response.body.msg).toBe("Text is missing");
  });
  it("it should return 201 status code -> comment created", async () => {
    const response = await request(app).post("/api/dogs/comment").send({
      dogId: "b476ac52-7dbf-4fae-a46e-502f257b6304",
      text: "Last Comment Last",
    });
    expect(response.status).toBe(201);
  });
}); */

/* describe("GET /comments/:id route -> get dog comments", () => {
  it("it should return 400 status code -> id invalid format", async () => {
    const response = await request(app).get("/api/dogs/comments/1");
    expect(response.status).toBe(400);
    expect(response.body.msg).toBe("ID: 1 - Invalid format!");
  });
  it("it should return 404 status code -> dog not found", async () => {
    const response = await request(app).get(
      "/api/dogs/comments/07dc9be9-7359-4f03-b0df-07794806aa25"
    );
    expect(response.status).toBe(404);
    expect(response.body.msg).toBe(
      "Dog with ID: 07dc9be9-7359-4f03-b0df-07794806aa25 not found!"
    );
  });
  it("it should return 404 status code -> no comments", async () => {
    const response = await request(app).get(
      "/api/dogs/comments/d92b00b2-7d0f-4920-9db4-05008a858278"
    );
    expect(response.status).toBe(404);
    expect(response.body.msg).toBe("This dog does not have comments to show!");
  });
  it("it should return 200 status code -> get comments", async () => {
    const response = await request(app).get(
      "/api/dogs/comments/b476ac52-7dbf-4fae-a46e-502f257b6304"
    );
    expect(response.status).toBe(200);
  });
}); */

/* describe("GET /comments route -> get last comments", () => {
  it("it should return 200 status code -> get last comments", async () => {
    const response = await request(app).get("/api/dogs/comments/last");
    expect(response.status).toBe(200);
  });
}); */

/* describe("GET /random route -> get random dog", () => {
  it("it should return 200 status code -> get random dog", async () => {
    const response = await request(app).get("/api/dogs/random");
    expect(response.status).toBe(200);
  });
  it("it should return 200 status code -> get random dog", async () => {
    const response = await request(app).get("/api/dogs/random");
    expect(response.status).toBe(200);
    7;
  });
});
 */
