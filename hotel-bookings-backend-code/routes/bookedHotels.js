var express = require("express");
var router = express.Router();
var hotelsController = require("../controllers/hotelsData");


router.get("/", hotelsController.getBoookedHotels);

router.put("/:id", hotelsController.updateHotel);

module.exports = router;