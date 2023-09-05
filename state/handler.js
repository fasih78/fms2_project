const StateModel = require("./stateSchema")
const fastify = require("fastify")({ logger: true });

const createStateHandler = async (req, reply) => {
  try {
    const { name } = req.body;
    const LastUser = await StateModel.findOne().sort({ _id: -1 });
    const id = LastUser ? LastUser.id + 1 : 1;
    const state = await StateModel.create({
      id: id,
      Name: name,
    });
    await state.save();
    return reply.status(200).send("State Create Sucessfully!`");
  } catch (error) {
    return reply.status(500).send({ error: error.message });
  }
};
const StateFindoneHandler = async (request, reply) => {
  try {
    let id = { _id: request.params.id };
    console.log(id);
    const state = await StateModel.findById(id);
    console.log(state);
    return reply.status(200).send(state);
  } catch (error) {
    return reply.status(500).send({ error: error.message });
  }
};

const StateFindallHandler = async (request, reply) => {
  try {
    const state = await StateModel.find();
    console.log(state);
    return reply.status(200).send(state);
  } catch (error) {
    reply.status(500).send({ error: error.message });
  }
};

const StateDeleteoneHandler = async (req, reply) => {
  try {
    const id = { _id: req.params.id };
    const state = await StateModel.findByIdAndDelete(id).exec();
    return reply.status(200).send("Sucessfully Delete The Record!");
  } catch (error) {
    return reply.status(500).send({ error: error.message });
  }
};
const StateDeleteallHandler = async (req, reply) => {
  try {
    const state = await StateModel.deleteMany({}).exec();
    return reply.status(200).send("All Records Deleted Sucessfully!");
  } catch (error) {
    return reply.status(500).send({ error: error.message });
  }
};

const StateUpdatebyidHandler = async (req, reply) => {
  try {
    const { name } = req.body;
    const id = { _id: req.params.id };
    const state = await StateModel.findByIdAndUpdate(id, {
      Name: name,
    }).exec();
    return reply.status(201).send("State has been updated!");
  } catch (error) {
    return reply.status(500).send({ error: error.message });
  }
};

module.exports = {
  createStateHandler,
  StateFindoneHandler,
  StateFindallHandler,
  StateDeleteoneHandler,
  StateDeleteallHandler,
  StateUpdatebyidHandler,
};
