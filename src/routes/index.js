const router = require("express").Router();

const healthController = require("../controllers/HealthController");
const v1 = require("./v1/index");
const invalidRoute = require("./invalidRoute");

router.use("/health", healthController.check);
router.use("/api/v1", v1);
router.use(invalidRoute); // All requests get or post sent to invalid routes end up here

module.exports = router;
