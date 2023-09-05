const ShipViaModel = require("./shipviamodel.js");
const fastify = require("fastify")({ logger: true });

const createShipviaHandler = async (req, reply) => {
  try {
    const { name } = req.body;
    const LastUser = await ShipViaModel.findOne().sort({ _id: -1 });
    const id = LastUser ? LastUser.id + 1 : 1;
    const shipvia = await ShipViaModel.create({
      id: id,
      Name: name,
    });
    await shipvia.save();
    return reply.status(200).send("shipvia Create Sucessfully!`");
  } catch (error) {
    return reply.status(500).send({ error: error.message });
  }
};
const ShipviaFindoneHandler = async (request, reply) => {
  try {
    let id = { _id: request.params.id };
    console.log(id);
    const shipvia = await ShipViaModel.findById(id);
    console.log(shipvia);
    return reply.status(200).send(shipvia);
  } catch (error) {
    return reply.status(500).send({ error: error.message });
  }
};

const ShipviaFindallHandler = async (request, reply) => {
  try {
    const shipvia = await ShipViaModel.find();
    console.log(shipvia);
    return reply.status(200).send(shipvia);
  } catch (error) {
    reply.status(500).send({ error: error.message });
  }
};

const ShipviaDeleteoneHandler = async (req, reply) => {
  try {
    const id = { _id: req.params.id };
    const shipvia = await ShipViaModel.findByIdAndDelete(id).exec();
    return reply.status(200).send("Sucessfully Delete The Record!");
  } catch (error) {
    return reply.status(500).send({ error: error.message });
  }
};
const ShipviaDeleteallHandler = async (req, reply) => {
  try {
    const shipvia = await ShipViaModel.deleteMany({}).exec();
    return reply.status(200).send("All Records Deleted Sucessfully!");
  } catch (error) {
    return reply.status(500).send({ error: error.message });
  }
};

const ShipviaUpdatebyidHandler = async (req, reply) => {
  try {
    const { name } = req.body;
    const id = { _id: req.params.id };
    const shipvia = await ShipViaModel.findByIdAndUpdate(id, {
      Name: name,
    }).exec();
    return reply.status(201).send("shipvia has been updated!");
  } catch (error) {
    return reply.status(500).send({ error: error.message });
  }
};
module.exports = {
  createShipviaHandler,
  ShipviaFindoneHandler,
  ShipviaFindallHandler,
  ShipviaDeleteoneHandler,
  ShipviaDeleteallHandler,
  ShipviaUpdatebyidHandler,
};
