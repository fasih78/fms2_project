const CurrencyModel = require("./currancySchema.js");

const createCurrencyHandler = async (req, reply) => {
  try {
    const { name } = req.body;
    const LastUser = await CurrencyModel.findOne().sort({ _id: -1 });
    const id = LastUser ? LastUser.id + 1 : 1;
    const currency = await CurrencyModel.create({
      id: id,
      Name: name,
    });
    await currency.save();
    return reply.status(200).send("Currency Create Sucessfully!`");
  } catch (error) {
    return reply.status(500).send({ error: error.message });
  }
};
const CurrencyFindoneHandler = async (request, reply) => {
  try {
    let id = { _id: request.params.id };
    console.log(id);
    const currency = await CurrencyModel.findById(id);
    console.log(currency);
    return reply.status(200).send(currency);
  } catch (error) {
    return reply.status(500).send({ error: error.message });
  }
};

const CurrencyFindallHandler = async (request, reply) => {
  try {
    const currency = await CurrencyModel.find();
    console.log(currency);
    return reply.status(200).send(currency);
  } catch (error) {
    reply.status(500).send({ error: error.message });
  }
};

const CurrencyDeleteoneHandler = async (req, reply) => {
  try {
    const id = { _id: req.params.id };
    const currency = await CurrencyModel.findByIdAndDelete(id).exec();
    return reply.status(200).send("Sucessfully Delete The Record!");
  } catch (error) {
    return reply.status(500).send({ error: error.message });
  }
};
const CurrencyDeleteallHandler = async (req, reply) => {
  try {
    const currency = await CurrencyModel.deleteMany({}).exec();
    return reply.status(200).send("All Records Deleted Sucessfully!");
  } catch (error) {
    return reply.status(500).send({ error: error.message });
  }
};

const CurrencyUpdatebyidHandler = async (req, reply) => {
  try {
    const { name } = req.body;
    const id = { _id: req.params.id };
    const currency = await CurrencyModel.findByIdAndUpdate(id, {
      Name: name,
    }).exec();
    return reply.status(201).send("Currency has been updated!");
  } catch (error) {
    return reply.status(500).send({ error: error.message });
  }
};
module.exports = {
  createCurrencyHandler,
  CurrencyFindoneHandler,
  CurrencyFindallHandler,
  CurrencyDeleteoneHandler,
  CurrencyDeleteallHandler,
  CurrencyUpdatebyidHandler,
};
