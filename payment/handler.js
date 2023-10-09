const { default: mongoose } = require("mongoose");
const PaymentModel = require("./paymentSchema.js");
const InvoiceModel = require("../invoice/invoiceSchema.js");
const InvoicedtlModel = require("../invoice/invoicedtlSchema.js");
const moment = require("moment");
const SalesContractModel = require("../salescontract/salescontractSchema.js");
const CustomerModel = require("../customer/customerSchema.js");

const createPaymentHandler = async (req, reply) => {
  try {
    const { paymentReceivedDate, cheaqueNo, specialInstruction, invoice } =
      req.body;

    const LastUser = await PaymentModel.findOne().sort({ _id: -1 });
    const id = LastUser ? LastUser.id + 1 : 1;

    const create = await PaymentModel.create({
      id: id,
      paymentReceivedDate: moment(paymentReceivedDate).format("YYYY-MM-DD"),
      cheaqueNo: cheaqueNo,
      specialInstruction: specialInstruction,
      invoice: new mongoose.Types.ObjectId(invoice),
    });
    const invoicetrue = await InvoiceModel.findByIdAndUpdate(invoice, {
      payment: true,
    });
    const invoicedtltrue = await InvoicedtlModel.findByIdAndUpdate({
      invoice: invoice,
      payment: true,
    });
  } catch (error) {
    reply.status(200).send("Sucessfully inserted!");
  }
};

const PaymentfindoneHandler = async (req, reply) => {
  try {
    const id = { _id: req.params.id };

    const Payment = await PaymentModel.find(id, {
      isDeleted: false,
    }).populate({
      path: "invoice",
      model: InvoiceModel,
      populate: [
        {
          path: "salesContract",
          model: SalesContractModel,
          populate: [{ path: CustomerModel, model: CustomerModel }],
        },
      ],
    });
    return Payment;
  } catch (err) {
    reply.status(500).send({ error: err.message });
  }
};

const PaymentfindallHandler = async (req, reply) => {
  try {
    const payment = await PaymentModel.find({ isDeleted: false });
    return reply.status(201).send(payment);
  } catch (err) {
    reply.status(500).send({ error: err.message });
  }
};

const PaymentDeleteoneHandler = async (req, reply) => {
  try {
    const id = { _id: req.params.id };
    const deleteOne = await PaymentModel.findByIdAndUpdate(id, {
      isDeleted: true,
    });
  } catch (err) {
    reply.status(500).send({ error: err.message });
  }
};

const PaymentDeleteallHandler = async (req, reply) => {
  try {
    const payment = await PaymentModel.deleteMany({});
    return reply.status(200).send("Sucessfully Deleted!");
  } catch (err) {
    reply.status(500).send({ error: err.message });
  }
};

const PaymentupdatebyidHandler = async (req, reply) => {
  try {
    const id = { _id: req.params.id };
    const { paymentReceivedDate, cheaqueNo, specialInstruction, invoice } =
      req.body;

    const updatepayment = await PaymentModel.findByIdAndUpdate(id, {
      paymentReceivedDate: moment(paymentReceivedDate).format("YYYY-MM-DD"),
      cheaqueNo: cheaqueNo,
      specialInstruction: specialInstruction,
      invoice: new mongoose.Types.ObjectId(invoice),
    });
    return reply.status(200).send("Sucessfully updated!");
  } catch (error) {
    reply.status(500).send({ error: err.message });
  }
};

module.exports = {
  createPaymentHandler,
  PaymentfindoneHandler,
  PaymentfindallHandler,
  PaymentDeleteoneHandler,
  PaymentDeleteallHandler,
  PaymentupdatebyidHandler,
};
