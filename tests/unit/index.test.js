const request = require("supertest");
const app = require("../../src/index");

describe("Unit Tests", () => {
  describe("GET /", () => {
    it("should return Hello World message", async () => {
      const res = await request(app).get("/");
      expect(res.statusCode).toBe(200);
      expect(res.body.message).toBe("Hello World!");
    });
  });

  describe("GET /health", () => {
    it("should return ok status", async () => {
      const res = await request(app).get("/health");
      expect(res.statusCode).toBe(200);
      expect(res.body.status).toBe("ok");
    });
  });

  describe("POST /sum", () => {
    it("should return sum of two numbers", async () => {
      const res = await request(app)
        .post("/sum")
        .send({ a: 5, b: 3 });
      expect(res.statusCode).toBe(200);
      expect(res.body.result).toBe(8);
    });

    it("should return 400 for invalid input", async () => {
      const res = await request(app)
        .post("/sum")
        .send({ a: "hello", b: 3 });
      expect(res.statusCode).toBe(400);
      expect(res.body.error).toBeDefined();
    });
  });
});
