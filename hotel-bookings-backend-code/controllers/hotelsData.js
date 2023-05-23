const hotelsSchema = require("../model/hotelsSchemas");

const createHotel = async function (req, res, next) {
  try {
    //const { body } = req;

    console.log(req.body);
    const hotel = new hotelsSchema(req.body);
    await hotel.save();
    res.send(hotel);
  } catch (err) {
    res.status(400).send({ message: "Bad Request" });
  }
};

const getHotels = async function (req, res, next) {
  try {
    //const { body } = req;
    if (req.query.search) {
      const hotelsFilteredData = await hotelsSchema.aggregate([
        {
          $match: {
            $or: [
              {
                name: {
                  $regex: req.query.search,
                  $options: "i",
                },
              },
              {
                location: {
                  $regex: req.query.search,
                  $options: "i",
                },
              },
            ],
          },
        },
      ]);
      res.send(hotelsFilteredData);
    } else {
      const hotelsData = await hotelsSchema.find({});
      res.send(hotelsData);
    }
  } catch (err) {
    res.status(400).send({ message: "Bad Request" });
  }
};
const getHotel = async function (req, res, next) {
  try {
    //const { body } = req;
    const { id } = req.params;
    const hotelsData = await hotelsSchema.findById(id);

    res.send(hotelsData);
  } catch (err) {
    res.status(400).send({ message: "Bad Request", id: id });
  }
};
const updateHotel = async function (req, res, next) {
  try {
    //const { body } = req;
    const { id } = req.params;
    const dataStatus = req.body;
    console.log(dataStatus, id, req.body);
    const updatedData = await hotelsSchema.findByIdAndUpdate(id, {
      status: dataStatus.status,
    });
    const hotelsData = await hotelsSchema.find();
    res.send({ response: hotelsData, message: "ok" });
  } catch (err) {
    res.status(400).send({ message: "Bad Request" });
  }
};
const getBoookedHotels = async function (req, res, next) {
  try {
    //const { body } = req;
    const { id } = req.params;
    const hotelsData = await hotelsSchema.find({ status: "booked" });

    res.send(hotelsData);
  } catch (err) {
    res.status(400).send({ message: "Bad Request", id: id });
  }
};

module.exports = {
  createHotel,
  getHotels,
  getHotel,
  updateHotel,
  getBoookedHotels,
};
