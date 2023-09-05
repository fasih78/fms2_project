const MachineModel = require("./machineSchema.js");

const createMachineHandler = async (req, reply) => {
  try {
    const { name } = req.body;
    const LastUser = await MachineModel.findOne().sort({ _id: -1 });
    const id = LastUser ? LastUser.id + 1 : 1;
    const machine = await MachineModel.create({
      id: id,
      name: name,
    });
    await machine.save();
    return reply.status(200).send("Machine Create Sucessfully!`");
  } catch (error) {
    return reply.status(500).send({ error: error.message });
  }
};
const MachineFindoneHandler = async (request, reply) => {
  try {
    let id = { _id: request.params.id };
    console.log(id);
    const machine = await MachineModel.findById(id);
    console.log(machine);
    return reply.status(200).send(machine);
  } catch (error) {
    return reply.status(500).send({ error: error.message });
  }
};

const MachineFindallHandler = async (request, reply) => {
  try {
    const machine = await MachineModel.find();
    console.log(machine);
    return reply.status(200).send(machine);
  } catch (error) {
    reply.status(500).send({ error: error.message });
  }
};

const MachineDeleteoneHandler = async (req, reply) => {
  try {
    const id = { _id: req.params.id };
    const machine = await MachineModel.findByIdAndDelete(id).exec();
    return reply.status(200).send("Sucessfully Delete The Record!");
  } catch (error) {
    return reply.status(500).send({ error: error.message });
  }
};
const MachineDeleteallHandler = async (req, reply) => {
  try {
    const machine = await MachineModel.deleteMany({}).exec();
    return reply.status(200).send("All Records Deleted Sucessfully!");
  } catch (error) {
    return reply.status(500).send({ error: error.message });
  }
};

const MachineUpdatebyidHandler = async (req, reply) => {
  try {
    const { name } = req.body;
    const id = { _id: req.params.id };
    const machine = await MachineModel.findByIdAndUpdate(id, {
      Name: name,
    }).exec();
    return reply.status(201).send("Machine has been updated!");
  } catch (error) {
    return reply.status(500).send({ error: error.message });
  }
};

module.exports = {
  createMachineHandler,
  MachineFindoneHandler,
  MachineFindallHandler,
  MachineDeleteoneHandler,
  MachineDeleteallHandler,
  MachineUpdatebyidHandler,
};
