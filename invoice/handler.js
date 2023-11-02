const InvoiceModel = require("./invoiceSchema.js");
const InvoicedtlModel = require("./invoicedtlSchema.js");
const ProductModel = require("../product/productSchema.js");
const CurrencyModel = require("../currency/currancySchema.js");
const SalesContractModel = require("../salescontract/salescontractSchema.js");
const moment = require("moment");
const mongoose = require("mongoose");
const { ObjectId } = require("mongodb");
const SaleContractdtlModel = require("../salescontract/salescontractdtlSchema.js");

const createInvoiceHandler = async (req, reply) => {
  try {
    const {
      inv,
      date,
      saleTaxinvoice_no,
      salesContract,
      specialInstruction,
      invoiceDtl,
    } = req.body;
    console.log(req.body);

    const LastUser = await InvoiceModel.findOne().sort({ _id: -1 });
    const id = LastUser ? LastUser.id + 1 : 1;
    const invoice = await InvoiceModel.create({
      id: id,
      inv: inv,
      date: moment(date).format("YYYY-MM-DD"),
      salesContract: new mongoose.Types.ObjectId(salesContract),
      specialInstuction: specialInstruction,
      saleTaxinvoice_no: saleTaxinvoice_no,
    });

    for (const invDtl of invoiceDtl) {
      const newInvoiceDtl = await InvoicedtlModel.create({
        inv: inv,
        qty: invDtl.qty,
        rate: invDtl.rate,
        amount: +invDtl.qty * +invDtl.rate,
        uom: invDtl.uom,
        date: moment(date).format("YYYY-MM-DD"),
        salesTaxRate: invDtl.salesTaxRate,
        salesTaxAmount: +invDtl.salesTaxRate * +invDtl.qty * +invDtl.rate,
        exchangeRate: +invDtl.exchangeRate,
        customer: new mongoose.Types.ObjectId(invDtl.customer),
        product: new mongoose.Types.ObjectId(invDtl.product),
        currency: new mongoose.Types.ObjectId(invDtl.currency),
        invoice: new mongoose.Types.ObjectId(invoice._id),
      });
    }
    const invoicetrue = await SalesContractModel.findByIdAndUpdate(
      salesContract,
      { invoice: true }
    );
    return reply.status(200).send("Sucessfully Inseted!");
  } catch (err) {
    reply.status(500).send({ error: err.message });
  }
};

const InvoicefindDtlByDateHandler = async (req, reply) => {
  try {
    const where = {};
    const where2 = {};
    const isValidObjectId = mongoose.Types.ObjectId.isValid;

    const invoiceId = isValidObjectId(req.body.invoice)
      ? new mongoose.Types.ObjectId(req.body.invoice)
      : null;
    const salesContractId = isValidObjectId(req.body.salesContract)
      ? new mongoose.Types.ObjectId(req.body.salesContract)
      : null;
    const productId = isValidObjectId(req.body.product)
      ? new mongoose.Types.ObjectId(req.body.product)
      : null;
    const customerId = isValidObjectId(req.body.customer)
      ? new mongoose.Types.ObjectId(req.body.customer)
      : null;

    const fromDate = moment(req.body.fromDate).startOf("day");
    const toDate = moment(req.body.toDate).endOf("day");
    let invoicedtl;

    if (!invoiceId && !salesContractId && !productId && !customerId) {
      // If no filter parameters are provided, retrieve all invoices within the date range
      invoicedtl = await InvoiceModel.aggregate([
        {
          $match: {
            date: {
              $gte: fromDate.toDate(),
              $lte: toDate.toDate(),
            },
            isDeleted: false,
          },
        },
        {
          $lookup: {
            from: "salescontracts",
            localField: "salesContract",
            foreignField: "_id",
            as: "salesContract",
          },
        },
      ]);
      return invoicedtl;
    } else if (invoiceId || salesContractId) {
      if (invoiceId && !salesContractId) {
        invoicedtl = await InvoiceModel.aggregate([
          {
            $match: {
              _id: invoiceId,
              //salesContract: salesContractId,
              date: {
                $gte: fromDate.toDate(),
                $lte: toDate.toDate(),
              },
              isDeleted: false,
            },
          },
          {
            $lookup: {
              from: "salescontracts",
              localField: "salesContract",
              foreignField: "_id",
              as: "salesContract",
            },
          },
          // Continue with other $lookup stages for customers, invoicedtls, products, and currencies
        ]);
      }

      if (salesContractId && !invoiceId) {
        invoicedtl = await InvoiceModel.aggregate([
          {
            $match: {
              //  _id: invoiceId,
              salesContract: salesContractId,
              date: {
                $gte: fromDate.toDate(),
                $lte: toDate.toDate(),
              },
              isDeleted: false,
            },
          },
          {
            $lookup: {
              from: "salescontracts",
              localField: "salesContract",
              foreignField: "_id",
              as: "salesContract",
            },
          },
        ]);
      }
      if (salesContractId && invoiceId) {
        invoicedtl = await InvoiceModel.aggregate([
          {
            $match: {
              _id: invoiceId,
              salesContract: salesContractId,
              date: {
                $gte: fromDate.toDate(),
                $lte: toDate.toDate(),
              },
              isDeleted: false,
            },
          },
          {
            $lookup: {
              from: "salescontracts",
              localField: "salesContract",
              foreignField: "_id",
              as: "salesContract",
            },
          },
        ]);
      }

      return invoicedtl;
    } else if (productId || customerId) {
      // If either productId or customerId is provided, filter by them within the date range
      if (productId && !customerId) {
        invoicedtl = await InvoicedtlModel.aggregate([
          {
            $match: {
              product: productId,
              date: {
                $gte: fromDate.toDate(),
                $lte: toDate.toDate(),
              },
              isDeleted: false,
            },
          },
          {
            $lookup: {
              from: "products",
              localField: "product",
              foreignField: "_id",
              as: "products",
            },
          },
          {
            $lookup: {
              from: "customers",
              localField: "customer",
              foreignField: "_id",
              as: "customers",
            },
          },
        ]);
      }
      if (customerId && !productId) {
        invoicedtl = await InvoicedtlModel.aggregate([
          {
            $match: {
              customer: customerId,
              date: {
                $gte: fromDate.toDate(),
                $lte: toDate.toDate(),
              },
              isDeleted: false,
            },
          },
          {
            $lookup: {
              from: "products",
              localField: "product",
              foreignField: "_id",
              as: "products",
            },
          },
          {
            $lookup: {
              from: "customers",
              localField: "customer",
              foreignField: "_id",
              as: "customers",
            },
          },
          // Continue with other $lookup stages for invoices, salescontracts, and other related data
        ]);
      }
      if (customerId && productId) {
        invoicedtl = await InvoicedtlModel.aggregate([
          {
            $match: {
              product: productId,
              customer: customerId,
              date: {
                $gte: fromDate.toDate(),
                $lte: toDate.toDate(),
              },
              isDeleted: false,
            },
          },
          {
            $lookup: {
              from: "products",
              localField: "product",
              foreignField: "_id",
              as: "products",
            },
          },
          {
            $lookup: {
              from: "customers",
              localField: "customer",
              foreignField: "_id",
              as: "customers",
            },
          },
        ]);
      }
      return invoicedtl;
    }
  } catch (err) {
    return reply.status(500).send({ error: err.message });
  }
};

const InvoiceFindall = async (reply, res) => {
  try {
    const invoice = await InvoicedtlModel.aggregate([
      {
        $match: {
          isDeleted: false,
        },
      },

      {
        $lookup: {
          from: "invoices",
          localField: "invoice",
          foreignField: "_id",
          as: "invoice",
          pipeline: [
            {
              $lookup: {
                from: "salescontracts",
                localField: "salesContract",
                foreignField: "_id",
                as: "salecontracts",
              },
            },
          ],
        },
      },
      {
        $project: {
          qty: 1,
          date: 1,
          amount: 1,
          uom: 1,
          inv: {
            $first: "$invoice.inv",
          },
          contract: {
            $first: "$invoice.salecontracts.contract",
          },
        },
      },
    ]);
    return invoice;
  } catch (err) {
    reply.status(500).send({ error: err.message });
  }
};
const InvoiceGroupByQTY = async (reply, res) => {
  try {
    const invoiceqty = await SaleContractdtlModel.aggregate([
      {
        $match: {
          isDeleted: false,
        },
      },
      {
        $lookup: {
          from: "salescontracts",
          localField: "salesContract",
          foreignField: "_id",
          as: "saleContract",
          pipeline: [
            {
              $lookup: {
                from: "invoices",
                localField: "_id",
                foreignField: "salesContract",
                as: "total_invoice",
              },
            },
          ],
        },
      },
      {
        $group: {
          _id: null,
          totalqty: {
            $sum: "$amount",
          },
          totalrate: {
            $sum: "$rate",
          },
          totalamount: {
            $sum: "$amount",
          },
          total_invoice: {
            $first: "$saleContract.total_invoice",
          },
        },
      },
      {
        $project: {
          totalrate: 1,
          totalqty: 1,
          totalamount: 1,
          total_invoice_length: {
            $size: {
              $first: "$total_invoice",
            },
          },
        },
      },
    ]);
    return invoiceqty;
  } catch (err) {
    reply.status(500).send({ error: err.message });
  }
};

const InvoiceDeleteAll = async (req, reply) => {
  try {
    const delete1 = await InvoiceModel.deleteMany({});
    const deleteall = await InvoicedtlModel.deleteMany({});
    return reply.status(200).send("Deleted Sucessfully!");
  } catch (err) {
    reply.status(500).send({ error: err.message });
  }
};
const InvoiceDelelteOne = async (req, reply) => {
  try {
    const id = req.params.id;

    const deleteid = await InvoiceModel.findByIdAndUpdate(id, {
      isDeleted: true,
    });

    const dtl = await InvoicedtlModel.updateMany(
      { invoice: id },
      {
        isDeleted: true,
      }
    );

    reply.send({ message: "Invoice deleted successfully" });
  } catch (err) {
    reply.status(500).send({ error: err.message });
  }
};

const InvoiceupdateByid = async (req, reply) => {
  try {
    const id = { _id: req.params.id };
    const {
      inv,
      date,
      saleTaxinvoice_no,
      salesContract,
      specialInstruction,
      invoiceDtl,
    } = req.body;

    const invoice = await InvoiceModel.findByIdAndUpdate(id, {
      id: id,
      inv: inv,
      date: moment(date).format("YYYY-MM-DD"),
      salesContract: new mongoose.Types.ObjectId(salesContract),
      specialInstuction: specialInstruction,
      saleTaxinvoice_no: saleTaxinvoice_no,
    });
    await InvoicedtlModel.deleteMany({ invoice: id });
    for (const invDtl of invoiceDtl) {
      const newInvoiceDtl = await InvoicedtlModel.create({
        qty: invDtl.qty,
        rate: invDtl.rate,
        amount: +invDtl.qty * +invDtl.rate,
        uom: invDtl.uom,
        date: moment(date).format("YYYY-MM-DD"),
        salesTaxRate: invDtl.salesTaxRate,
        salesTaxAmount: +invDtl.salesTaxRate * +invDtl.qty * +invDtl.rate,
        exchangeRate: +invDtl.exchangeRate,
        customer: new mongoose.Types.ObjectId(invDtl.customer),
        product: new mongoose.Types.ObjectId(invDtl.product),
        currency: new mongoose.Types.ObjectId(invDtl.currency),
        invoice: new mongoose.Types.ObjectId(invoice._id),
      });
    }
    return reply.status(200).send("Sucessfully updated!");
  } catch (err) {
    reply.status(500).send({ error: err.message });
  }
};

module.exports = {
  createInvoiceHandler,
  InvoicefindDtlByDateHandler,
  InvoiceFindall,
  InvoiceGroupByQTY,
  InvoiceDeleteAll,
  InvoiceDelelteOne,
  InvoiceupdateByid,
};
