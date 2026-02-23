const request = require("supertest");
const app = require("../../src/index");

describe("E2E Tests", () => {
  it("full flow: health check then sum", async () => {
    // Step 1: health check
    const health = await request(app).get("/health");
    expect(health.body.status).toBe("ok");

    // Step 2: perform a sum
    const sum = await request(app)
      .post("/sum")
      .send({ a: 10, b: 20 });
    expect(sum.body.result).toBe(30);
  });

  it("should handle a full bad request flow", async () => {
    const res = await request(app)
      .post("/sum")
      .send({ a: null, b: null });
    expect(res.statusCode).toBe(400);
  });
});
