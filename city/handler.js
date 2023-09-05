const CityModel = require("./citySchema.js");
const fastify = require("fastify")({ logger: true });

const createCityHandler = async (req, reply) => {
  try {
    const { name } = req.body;
    const LastUser = await CityModel.findOne().sort({ _id: -1 });
    const id = LastUser ? LastUser.id + 1 : 1;
    const city = await CityModel.create({
      id: id,
      Name: name,
    });
    await city.save();
    return reply.status(200).send("City Create Sucessfully!`");
  } catch (error) {
    return reply.status(500).send({ error: error.message });
  }
};
const cityFindoneHandler = async (request, reply) => {
  try {
    let id = { _id: request.params.id };
    console.log(id);
    const city = await CityModel.findById(id);
    console.log(city);
    return reply.status(200).send(city);
  } catch (error) {
    return reply.status(500).send({ error: error.message });
  }
};

const cityFindallHandler = async (request, reply) => {
  try {
    const city = await CityModel.find();
    console.log(city);
    return reply.status(200).send(city);
  } catch (error) {
    reply.status(500).send({ error: error.message });
  }
};

const cityDeleteoneHandler = async (req, reply) => {
  try {
    const id = { _id: req.params.id };
    const city = await CityModel.findByIdAndDelete(id).exec();
    return reply.status(200).send("Sucessfully Delete The Record!");
  } catch (error) {
    return reply.status(500).send({ error: error.message });
  }
};
const cityDeleteallHandler = async (req, reply) => {
  try {
    const city = await CityModel.deleteMany({}).exec();
    return reply.status(200).send("All Records Deleted Sucessfully!");
  } catch (error) {
    return reply.status(500).send({ error: error.message });
  }
};

const cityUpdatebyidHandler = async (req, reply) => {
  try {
    const { name } = req.body;
    const id = { _id: req.params.id };
    const city = await CityModel.findByIdAndUpdate(id, {
      Name: name,
    }).exec();
    return reply.status(201).send("City has been updated!");
  } catch (error) {
    return reply.status(500).send({ error: error.message });
  }
};

module.exports = {
  createCityHandler,
  cityFindoneHandler,
  cityFindallHandler,
  cityDeleteoneHandler,
  cityDeleteallHandler,
  cityUpdatebyidHandler,
};
