const PaymentModel = require("../payment/paymentSchema");
const RoyalityModel = require("./royalitySchema.js");
const InvoicedtlModel = require("../invoice/invoicedtlSchema.js");
const moment = require("moment");
const { mongo, Mongoose, default: mongoose } = require("mongoose");

const CreateRoyalityHandler = async (req, reply) => {
  try {
    const {
      paid,
      saleTaxinvoicedate,
      payment,
      invoice,
      customer,
      saleContract,
    } = req.body;

    const LastUser = await RoyalityModel.findOne().sort({ _id: -1 });
    const id = LastUser ? LastUser.id + 1 : 1;

    const payement = await PaymentModel.findOne({ _id: payment });
    const Paymentdate = payement.paymentDate;
    const invdtl = await InvoicedtlModel.findOne({ invoice: invoice });
    const amount = invdtl.amount;
    const royalityamount = (amount * 15) / 100;

    const royality = await RoyalityModel.create({
      id: id,
      paid: paid,
      saleTaxinvoicedate: moment(saleTaxinvoicedate).format("YYYY-MM-DD"),
      paymentDate: moment(Paymentdate).format("YYYY-MM-DD"),
      amount: royalityamount,
      royalityrate: 15,
      payment: payment,
      invoice: invoice,
      customer: customer,
      saleContract: saleContract,
    });
    return royality;
  } catch (err) {
    reply.status(500).send({ error: err.message });
  }
};

const RoyalityFindAllHandler = async (req, reply) => {
  try {
    const royality = await RoyalityModel.aggregate([
      {
        $match: {
          isDeleted: false,
        },
      },
      {
        $lookup: {
          from: "salescontracts",
          localField: "saleContract",
          foreignField: "_id",
          as: "salecontract_dtls",
        },
      },
      {
        $lookup: {
          from: "invoices",
          localField: "invoice",
          foreignField: "_id",
          as: "invoice_dtls",
        },
      },
      {
        $lookup: {
          from: "payments",
          localField: "payment",
          foreignField: "_id",
          as: "payment_dtls",
        },
      },
      {
        $lookup: {
          from: "customers",
          localField: "customer",
          foreignField: "_id",
          as: "customer_dtls",
        },
      },
    ]);
    return royality;
  } catch (err) {
    reply.status(500).send({ error: err.message });
  }
};
const RoyalityDeleteAllHandler = async (req, reply) => {
  try {
    const royalitydeleteall = await RoyalityModel.deleteMany({});
    return reply.status(200).send("Sucessfully Deleted!");
  } catch (error) {
    reply.status(500).send({ error: err.message });
  }
};

const RoyalityDeleteOneHandler = async (req, reply) => {
  try {
    const id = { _id: req.params.id };
    const Royalitydeleteone = await RoyalityModel.findByIdAndUpdate(id, {
      isDeleted: true,
    });
  } catch (error) {
    reply.status(500).send({ error: err.message });
  }
};

const RoyalityUpdateOneHandler = async (req, reply) => {
  try {
    const {
      paid,
      saleTaxinvoicedate,
      royalityamount,
      payment,
      invoice,
      customer,
      saleContract,
    } = req.body;

    const id = { _id: req.params.id };
    const updatebyid = await RoyalityModel.updateOne(id, {
      paid: paid,
      saleTaxinvoicedate: moment(saleTaxinvoicedate).format("YYYY-MM-DD"),
      royalityamount: royalityamount,
      royalityrate: 15,
      payment: new mongoose.Types.ObjectId(payment),
      invoice: new mongoose.Types.ObjectId(invoice),
      customer: new mongoose.Types.ObjectId(customer),
      saleContract: new mongoose.Types.ObjectId(saleContract),
    });
    return reply.status(200).send("update Sucessfully!");
  } catch (err) {
    reply.status(500).send({ error: err.message });
  }
};

const RoyalityReportdtlHandler = async (req, reply) => {
  try {
    const fromDate = moment(req.body.fromDate).startOf("day");
    const toDate = moment(req.body.toDate).endOf("day");
    const isValidObjectId = mongoose.Types.ObjectId.isValid;

    const invoiceId = isValidObjectId(req.body.invoice)
      ? new mongoose.Types.ObjectId(req.body.invoice)
      : null;
    const salesContractId = isValidObjectId(req.body.salesContract)
      ? new mongoose.Types.ObjectId(req.body.salesContract)
      : null;
    const payementId = isValidObjectId(req.body.payement)
      ? new mongoose.Types.ObjectId(req.body.payement)
      : null;
    const customerId = isValidObjectId(req.body.customer)
      ? new mongoose.Types.ObjectId(req.body.customer)
      : null;

    const matchStage = {
      $match: {
        saleTaxinvoicedate: {
          $gte: fromDate.toDate(),
          $lte: toDate.toDate(),
        },
        isDeleted: false,
      },
    };
    const matchStage1 = {
      $match: {
        salesContract: salesContractId,
        saleTaxinvoicedate: {
          $gte: fromDate.toDate(),
          $lte: toDate.toDate(),
        },
        isDeleted: false,
      },
    };
    const matchStage2 = {
      $match: {
        customers: customerId,
        saleTaxinvoicedate: {
          $gte: fromDate.toDate(),
          $lte: toDate.toDate(),
        },
        isDeleted: false,
      },
    };

    const matchStage3 = {
      $match: {
        invoices: invoiceId,
        saleTaxinvoicedate: {
          $gte: fromDate.toDate(),
          $lte: toDate.toDate(),
        },
        isDeleted: false,
      },
    };

    const matchStage4 = {
      $match: {
        payement: payementId,
        saleTaxinvoicedate: {
          $gte: fromDate.toDate(),
          $lte: toDate.toDate(),
        },
        isDeleted: false,
      },
    };

    const aggregationPipeline = [
      matchStage,
      {
        $lookup: {
          from: "invoices",
          localField: "invoice",
          foreignField: "_id",
          as: "inv_dtl",
        },
      },
      {
        $lookup: {
          from: "customers",
          localField: "customer",
          foreignField: "_id",
          as: "customer_dtl",
        },
      },
      {
        $lookup: {
          from: "salescontracts",
          localField: "saleContract",
          foreignField: "_id",
          as: "salecontract_dtl",
        },
      },
      {
        $lookup: {
          from: "payments",
          localField: "payment",
          foreignField: "_id",
          as: "payment_dtl",
        },
      },
    ];
    const aggregationPipeline1 = [
      matchStage1,
      {
        $lookup: {
          from: "invoices",
          localField: "invoice",
          foreignField: "_id",
          as: "inv_dtl",
        },
      },
      {
        $lookup: {
          from: "customers",
          localField: "customer",
          foreignField: "_id",
          as: "customer_dtl",
        },
      },
      {
        $lookup: {
          from: "salescontracts",
          localField: "saleContract",
          foreignField: "_id",
          as: "salecontract_dtl",
        },
      },
      {
        $lookup: {
          from: "payments",
          localField: "payment",
          foreignField: "_id",
          as: "payment_dtl",
        },
      },
    ];
    const aggregationPipeline2 = [
      matchStage2,
      {
        $lookup: {
          from: "invoices",
          localField: "invoice",
          foreignField: "_id",
          as: "inv_dtl",
        },
      },
      {
        $lookup: {
          from: "customers",
          localField: "customer",
          foreignField: "_id",
          as: "customer_dtl",
        },
      },
      {
        $lookup: {
          from: "salescontracts",
          localField: "saleContract",
          foreignField: "_id",
          as: "salecontract_dtl",
        },
      },
      {
        $lookup: {
          from: "payments",
          localField: "payment",
          foreignField: "_id",
          as: "payment_dtl",
        },
      },
    ];
    const aggregationPipeline3 = [
      matchStage3,
      {
        $lookup: {
          from: "invoices",
          localField: "invoice",
          foreignField: "_id",
          as: "inv_dtl",
        },
      },
      {
        $lookup: {
          from: "customers",
          localField: "customer",
          foreignField: "_id",
          as: "customer_dtl",
        },
      },
      {
        $lookup: {
          from: "salescontracts",
          localField: "saleContract",
          foreignField: "_id",
          as: "salecontract_dtl",
        },
      },
      {
        $lookup: {
          from: "payments",
          localField: "payment",
          foreignField: "_id",
          as: "payment_dtl",
        },
      },
    ];
    const aggregationPipeline4 = [
      matchStage4,
      {
        $lookup: {
          from: "invoices",
          localField: "invoice",
          foreignField: "_id",
          as: "inv_dtl",
        },
      },
      {
        $lookup: {
          from: "customers",
          localField: "customer",
          foreignField: "_id",
          as: "customer_dtl",
        },
      },
      {
        $lookup: {
          from: "salescontracts",
          localField: "saleContract",
          foreignField: "_id",
          as: "salecontract_dtl",
        },
      },
      {
        $lookup: {
          from: "payments",
          localField: "payment",
          foreignField: "_id",
          as: "payment_dtl",
        },
      },
    ];

    const pageno = parseInt(req.body.page) || 1;
    const perPage = parseInt(req.body.perPage) || 10;

    console.log(req.body);
    if (
      !req.body.invoiceId &&
      !req.body.salesContractId &&
      !req.body.payementId &&
      !req.body.customerId
    ) {
      const limit = perPage;
      const skipCount = (pageno - 1) * limit;
      const royalitydtl = await RoyalityModel.aggregate([
        ...aggregationPipeline,
        { $skip: skipCount },
        { $limit: perPage },
        { $sort: { id: 1 } },
      ])

      return royalitydtl
      
    } else if (req.body.salesContractId || req.body.customerId) {
      if (req.body.salesContractId && !req.body.customerId) {
        const Details = await RoyalityModel.aggregate(aggregationPipeline1);
        return Details;
      } else if (!req.body.salesContractId && req.body.customerId) {
        const Details = await RoyalityModel.aggregate(aggregationPipeline2);
        return Details;
      }
    } else if (req.body.payementId || req.body.invoiceId) {
      if (req.body.invoiceId && !req.body.payementId) {
        const Details = await RoyalityModel.aggregate(aggregationPipeline3);
        return Details;
      } else if (!req.body.invoiceId && req.body.payementId) {
        console.log("execute");
        const Details = await RoyalityModel.aggregate(aggregationPipeline4);
        return Details;
      }
    }
  } catch (err) {
    reply.status(500).send({ error: err.message });
  }
};





module.exports = {
  CreateRoyalityHandler,
  RoyalityFindAllHandler,
  RoyalityDeleteAllHandler,
  RoyalityUpdateOneHandler,
  RoyalityDeleteOneHandler,
  RoyalityReportdtlHandler,
};
