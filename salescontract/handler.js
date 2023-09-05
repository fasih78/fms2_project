const CustomerModel = require("../customer/customerSchema.js");
const SalesContractModel = require("./salescontractSchema.js");
const SaleContractdtlModel = require("./salescontractdtlSchema.js");
const BrandModel = require("../brand/brandSchema.js");
const PaymentTermModel = require("../payment_term/payment_termSchema.js");
const moment = require("moment");
const mongoose = require("mongoose");
const ProductModel = require("../product/productSchema.js");
const CurrencyModel = require("../currency/currancySchema.js");
const ShipViaModel = require("../shipVia/shipviamodel.js");
const createSalesContract = async (req, reply) => {
  try {
    const {
      tran,
      po,
      contract,
      specialInstruction,
      customer,
      brand,
      paymentterm,
      shipvia,
      salesContractDtl,
      poDate,
      contractDate,
      tc_no,
      vendorgarment,
    } = req.body;
    const LastUser = await SalesContractModel.findOne().sort({ _id: -1 });
    const id = LastUser ? LastUser.id + 1 : 1;

    const salescontract = await SalesContractModel.create({
      id: id,
      tran: tran,
      po: po,
      contract: contract,
      specialInstruction: specialInstruction,
      customer: customer,
      brand: brand,
      paymentTerm: paymentterm,
      shipvia: shipvia,
      poDate: moment(poDate).format("YYYY-MM-DD"),
      contractDate: moment(contractDate).format("YYYY-MM-DD"),
      tc_no: tc_no,
      vendorgarment: vendorgarment,
    });
    console.log(salescontract._id);
    for (const sale of salesContractDtl) {
      const newSalesDtl = await SaleContractdtlModel.create({
        qty: sale.qty,
        rate: sale.rate,
        amount: +sale.qty * +sale.rate,
        uom: sale.uom,
        shipmentDate: sale.shipmentDate,
        product: new mongoose.Types.ObjectId(sale.product),
        currency: new mongoose.Types.ObjectId(sale.currency),
        salesContract: new mongoose.Types.ObjectId(salescontract._id),
        exchangeRate: sale.exchangeRate,
      });
    }
    return reply.status(200).send("SalesContract create Sucessfully!");
  } catch (err) {
    reply.status(500).send({ error: err.message });
  }
};

const SaleContractfindoneByidHandler = async (req, reply) => {
  try {
    const id = { _id: req.params.id };

    const salecontract = await SalesContractModel.find(id, {
      isDeleted: false,
    })
      .populate({
        path: "customer",
        model: CustomerModel,
      })
      .populate({
        path: "brand",
        model: BrandModel,
      });
    // .populate({
    //   path: paymentterm,
    //   model: PaymentTermModel,
    // });
    const salesContractDtl = await SaleContractdtlModel.find({
      salesContract: salecontract[0]._id,
      isDeleted: false,
    })
      .populate({
        path: "product",
        model: ProductModel,
      })
      .populate({
        path: "currency",
        model: CurrencyModel,
      });
    return salecontract;
  } catch (err) {
    reply.status(500).send({ error: err.message });
  }
};

const SaleContractFindallHandler = async (req, reply) => {
  try {
    const saleContract = await SaleContractdtlModel.find()
      .populate({
        path: "product",
        model: ProductModel,
      })
      .populate({
        path: "currency",
        model: CurrencyModel,
      })
      .populate({
        path: "salesContract",
        model: SalesContractModel,
        populate: [
          { path: "customer", model: CustomerModel },
          { path: "brand", model: BrandModel },
          { path: "shipvia", model: ShipViaModel },
        ],
      });
    return saleContract;
  } catch (err) {
    reply.status(500).send({ error: err.message });
  }
};

const findSalesContractDtlsByDate = async (req, reply) => {
  try {
    const fromDate = moment(req.body.fromDate).startOf("day");
    const toDate = moment(req.body.toDate).endOf("day");
    const customerid = req.body.customer_id;

    if (!customerid) {
      const sales = await SaleContractdtlModel.find({
        contractDate: {
          $gte: fromDate.toDate(),
          $lte: toDate.toDate(),
        },
        isDeleted: false,
      })
        .populate({
          path: "product",
          model: ProductModel,
        })
        .populate({
          path: "currency",
          model: CurrencyModel,
        })
        .populate({
          path: "salesContract",
          model: SalesContractModel,
          populate: [
            { path: "customer", model: CustomerModel },
            { path: "brand", model: BrandModel },
            { path: "shipvia", model: ShipViaModel },
          ],
        });

      return sales;
    } else {
      const saleContract = await SalesContractModel.findOne({
        customer: customerid,
        isDeleted: false,
      });

      if (!saleContract) {
      }

      const sales = await SaleContractdtlModel.find({
        salesContract: saleContract._id,
        contractDate: {
          $gte: fromDate.toDate(),
          $lte: toDate.toDate(),
        },
        isDeleted: false,
      })
        .populate({
          path: "product",
          model: ProductModel,
        })
        .populate({
          path: "currency",
          model: CurrencyModel,
        })
        .populate({
          path: "salesContract",
          model: SalesContractModel,
          populate: [
            { path: "customer", model: CustomerModel },
            { path: "brand", model: BrandModel },
            { path: "shipvia", model: ShipViaModel },
          ],
        });

      return sales;
    }
  } catch (err) {
    reply.status(500).send({ error: err.message });
  }
};

module.exports = {
  createSalesContract,
  SaleContractfindoneByidHandler,
  SaleContractFindallHandler,
  findSalesContractDtlsByDate,
};
