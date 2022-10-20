const router = require("express").Router();

// Reponds status 200 - OK as long as server is running
router.get("/health", (req, res) => {
  res.status(200).json({ status: "OK" });
});

module.exports = router;
