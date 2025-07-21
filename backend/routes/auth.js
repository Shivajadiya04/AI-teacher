const express = require("express");
const router = express.Router();

router.post("/login", (req, res) => {
  const { email, password } = req.body;

  // Dummy login logic
  if (email === "test@gmail.com" && password === "123456") {
    res.json({ success: true, token: "dummy-token" });
  } else {
    res.status(401).json({ success: false, message: "Invalid credentials" });
  }
});

module.exports = router;
