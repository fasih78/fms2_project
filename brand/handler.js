const BrandModel = require("./brandSchema.js");
const fastify = require("fastify")({ logger: true });

const createBrandHandler = async (req, reply) => {
  try {
    const { name } = req.body;
    const LastUser = await BrandModel.findOne().sort({ _id: -1 });
    const id = LastUser ? LastUser.id + 1 : 1;
    const country = await BrandModel.create({
      id: id,
      Name: name,
    });
    await country.save();
    return reply.status(200).send("Brand Create Sucessfully!`");
  } catch (error) {
    return reply.status(500).send({ error: error.message });
  }
};
const BrandFindoneHandler = async (request, reply) => {
  try {
    let id = { _id: request.params.id };
    console.log(id);
    const brand = await BrandModel.findById(id);
    console.log(brand);
    return reply.status(200).send(brand);
  } catch (error) {
    return reply.status(500).send({ error: error.message });
  }
};

const BrandFindallHandler = async (request, reply) => {
  try {
    const brand = await BrandModel.find();
    console.log(brand);
    return reply.status(200).send(brand);
  } catch (error) {
    reply.status(500).send({ error: error.message });
  }
};

const BrandDeleteoneHandler = async (req, reply) => {
  try {
    const id = { _id: req.params.id };
    const brand = await BrandModel.findByIdAndDelete(id).exec();
    return reply.status(200).send("Sucessfully Delete The Record!");
  } catch (error) {
    return reply.status(500).send({ error: error.message });
  }
};
const BrandDeleteallHandler = async (req, reply) => {
  try {
    const brand = await BrandModel.deleteMany({}).exec();
    return reply.status(200).send("All Records Deleted Sucessfully!");
  } catch (error) {
    return reply.status(500).send({ error: error.message });
  }
};

const BrandUpdatebyidHandler = async (req, reply) => {
  try {
    const { name } = req.body;
    const id = { _id: req.params.id };
    const brand = await BrandModel.findByIdAndUpdate(id, {
      Name: name,
    }).exec();
    return reply.status(201).send("Brand has been updated!");
  } catch (error) {
    return reply.status(500).send({ error: error.message });
  }
};

module.exports = {
  createBrandHandler,
  BrandFindoneHandler,
  BrandFindallHandler,
  BrandDeleteoneHandler,
  BrandDeleteallHandler,
  BrandUpdatebyidHandler,
};
