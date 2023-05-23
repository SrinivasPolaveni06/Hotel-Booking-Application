var mongoose = require("mongoose");

const hotelsSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  offer: { type: Number, required: true },
  img_url: { type: String, required: true },
  location: { type: String, required: true },
  rating: { type: Number, required: true },
  features: { type: [String] },
  status: { type: String, required: true },
});

const Hotels = mongoose.model("hotels", hotelsSchema);

module.exports = Hotels;
