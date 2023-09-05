const CountryModel = require("./countrySchema");
const fastify = require("fastify")({ logger: true });

const createCountryHandler = async (req, reply) => {
  try {
    const { name } = req.body;
    const LastUser = await CountryModel.findOne().sort({ _id: -1 });
    const id = LastUser ? LastUser.id + 1 : 1;
    const country = await CountryModel.create({
      id: id,
      Name: name,
    });
    await country.save();
    return reply.status(200).send("Country Create Sucessfully!`");
  } catch (error) {
    return reply.status(500).send({ error: error.message });
  }
};
const CountryFindoneHandler = async (request, reply) => {
  try {
    let id = { _id: request.params.id };
    console.log(id);
    const country = await CountryModel.findById(id);
    console.log(country);
    return reply.status(200).send(country);
  } catch (error) {
    return reply.status(500).send({ error: error.message });
  }
};

const CountryFindallHandler = async (request, reply) => {
  try {
    const country = await CountryModel.find();
    console.log(country);
    return reply.status(200).send(country);
  } catch (error) {
    reply.status(500).send({ error: error.message });
  }
};

const CountryDeleteoneHandler = async (req, reply) => {
  try {
    const id = { _id: req.params.id };
    const country = await CountryModel.findByIdAndDelete(id).exec();
    return reply.status(200).send("Sucessfully Delete The Record!");
  } catch (error) {
    return reply.status(500).send({ error: error.message });
  }
};
const CountryDeleteallHandler = async (req, reply) => {
  try {
    const country = await CountryModel.deleteMany({}).exec();
    return reply.status(200).send("All Records Deleted Sucessfully!");
  } catch (error) {
    return reply.status(500).send({ error: error.message });
  }
};

const CountryUpdatebyidHandler = async (req, reply) => {
  try {
    const { name } = req.body;
    const id = { _id: req.params.id };
    const country = await CountryModel.findByIdAndUpdate(id, {
      Name: name,
    }).exec();
    return reply.status(201).send("Country has been updated!");
  } catch (error) {
    return reply.status(500).send({ error: error.message });
  }
};
module.exports = {
  createCountryHandler,
  CountryFindoneHandler,
  CountryFindallHandler,
  CountryDeleteoneHandler,
  CountryDeleteallHandler,
  CountryUpdatebyidHandler,
};
