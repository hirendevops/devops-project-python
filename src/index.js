const express = require("express");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// Routes
app.get("/", (req, res) => {
  res.json({ message: "Hello World!", env: process.env.NODE_ENV });
});

app.get("/health", (req, res) => {
  res.json({ status: "ok" });
});

app.post("/sum", (req, res) => {
  const { a, b } = req.body;
  if (typeof a !== "number" || typeof b !== "number") {
    return res.status(400).json({ error: "a and b must be numbers" });
  }
  res.json({ result: a + b });
});

// Only start server if not in test mode
if (process.env.NODE_ENV !== "test") {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}

module.exports = app; // export for testing
