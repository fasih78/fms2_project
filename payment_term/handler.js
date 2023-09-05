const Payment_termModel = require("./payment_termSchema");

const createPayment_termHandler = async (req, reply) => {
  try {
    const { name } = req.body;
    const LastUser = await Payment_termModel.findOne().sort({ _id: -1 });
    const id = LastUser ? LastUser.id + 1 : 1;
    const payment = await Payment_termModel.create({
      id: id,
      Name: name,
    });
    await payment.save();
    return reply.status(200).send("payment Create Sucessfully!`");
  } catch (error) {
    return reply.status(500).send({ error: error.message });
  }
};
const Payment_termFindoneHandler = async (request, reply) => {
  try {
    let id = { _id: request.params.id };
    console.log(id);
    const payment = await Payment_termModel.findById(id);
    console.log(payment);
    return reply.status(200).send(payment);
  } catch (error) {
    return reply.status(500).send({ error: error.message });
  }
};

const Payment_termFindallHandler = async (request, reply) => {
  try {
    const payment = await Payment_termModel.find();
    console.log(payment);
    return reply.status(200).send(payment);
  } catch (error) {
    reply.status(500).send({ error: error.message });
  }
};

const Payment_termDeleteoneHandler = async (req, reply) => {
  try {
    const id = { _id: req.params.id };
    const payment = await Payment_termModel.findByIdAndDelete(id).exec();
    return reply.status(200).send("Sucessfully Delete The Record!");
  } catch (error) {
    return reply.status(500).send({ error: error.message });
  }
};
const Payment_termDeleteallHandler = async (req, reply) => {
  try {
    const payment = await Payment_termModel.deleteMany({}).exec();
    return reply.status(200).send("All Records Deleted Sucessfully!");
  } catch (error) {
    return reply.status(500).send({ error: error.message });
  }
};

const Payment_termUpdatebyidHandler = async (req, reply) => {
  try {
    const { name } = req.body;
    const id = { _id: req.params.id };
    const payment = await Payment_termModel.findByIdAndUpdate(id, {
      Name: name,
    }).exec();
    return reply.status(201).send("Currency has been updated!");
  } catch (error) {
    return reply.status(500).send({ error: error.message });
  }
};

module.exports = {
  createPayment_termHandler,
  Payment_termFindoneHandler,
  Payment_termFindallHandler,
  Payment_termDeleteoneHandler,
  Payment_termDeleteallHandler,
  Payment_termUpdatebyidHandler,
};
