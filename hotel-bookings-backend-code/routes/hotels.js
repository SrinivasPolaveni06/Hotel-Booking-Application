var express = require("express");
var router = express.Router();
var hotelsController = require("../controllers/hotelsData");

router.post("/", hotelsController.createHotel);
router.get("/", hotelsController.getHotels);
router.get("/:id", hotelsController.getHotel);
router.put("/:id", hotelsController.updateHotel);

module.exports = router;
