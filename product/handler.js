const { default: mongoose } = require("mongoose");
const ProductModel = require("./productSchema.js");

const createProductHandler = async (req, reply) => {
  try {
    const { name,price, currency } = req.body;

    const LastUser = await ProductModel.findOne().sort({ _id: -1 });
    const id = LastUser ? LastUser.id + 1 : 1;
console.log(id);
    const create = await ProductModel.create({
      id: id,
      name: name,
      price:price,
      currency: currency,
    });
    await create.save();

    reply.status(200).send("Sucessfully Created!");
  } catch (error) {
    reply.status(500).send({ error: error.message });
  }
};
const ProductFindoneHandler = async (request, reply) => {
  try {
    let id = { _id: request.params.id };
    console.log(id);
    const product = await ProductModel.findById(id);
    console.log(product);
    return reply.status(200).send(product);
  } catch (error) {
    return reply.status(500).send({ error: error.message });
  }
};

const ProductFindallHandler = async (request, reply) => {
  try {
    const product = await ProductModel.find();
    console.log(product);
    return reply.status(200).send(product);
  } catch (error) {
    reply.status(500).send({ error: error.message });
  }
};

const ProductDeleteoneHandler = async (req, reply) => {
  try {
    const id = { _id: req.params.id };
    const product = await ProductModel.findByIdAndDelete(id).exec();
    return reply.status(200).send("Sucessfully Delete The Record!");
  } catch (error) {
    return reply.status(500).send({ error: error.message });
  }
};
const ProductDeleteallHandler = async (req, reply) => {
  try {
    const product = await ProductModel.deleteMany({}).exec();
    return reply.status(200).send("All Records Deleted Sucessfully!");
  } catch (error) {
    return reply.status(500).send({ error: error.message });
  }
};
const ProductUpdatebyidHandler = async (req, reply) => {
  try {
    const { name, currency } = req.body;
    const id = { _id: req.params.id };
    const product = await ProductModel.findByIdAndUpdate(id, {
      id: id,
      name: name,
      currency: new mongoose.Types.ObjectId(currency),
    }).exec();
    return reply.status(201).send("Product has been updated!");
  } catch (error) {
    return reply.status(500).send({ error: error.message });
  }
};
module.exports = {
  createProductHandler,
  ProductFindoneHandler,
  ProductFindallHandler,
  ProductDeleteoneHandler,
  ProductDeleteallHandler,
  ProductUpdatebyidHandler,
};
