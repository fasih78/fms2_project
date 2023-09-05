const ProductionModel = require("./productionModel");
const ProductiondtlModel = require("./productiondtlModel");
const MachineModel = require("../machine/machineSchema.js");
const CustomerModel = require("../customer/customerSchema.js");
const ProductModel = require("../product/productSchema.js");
const mongoose = require("mongoose");
const moment = require("moment");

const createProductionHandler = async (req, reply) => {
  try {
    const {
      tran,
      date,
      productiontype,
      specialInstruction,
      machine,
      customer,
      Productiondtl,
    } = req.body;

    console.log(Productiondtl, "req");
    const LastUser = await ProductionModel.findOne().sort({ _id: -1 });
    const id = LastUser ? LastUser.id + 1 : 1;
    const create = await ProductionModel.create({
      id: id,
      tran: tran,
      date: moment(date).format("YYYY-MM-DD"),
      productionType: productiontype,
      specialInstruction: specialInstruction,
      machine: machine,
      customer: customer,
    });
    for (const prod of Productiondtl) {
      const newProductionDtl = await ProductiondtlModel.create({
        lot: prod.lot,
        date: moment(date).format("YYYY-MM-DD"),
        bales: prod.bales,
        qty: prod.qty,
        uom: prod.uom,
        product: new mongoose.Types.ObjectId(prod.product),
        production: new mongoose.Types.ObjectId(create._id),
      });
    }
    return reply.status(200).send("Production create Sucessfully!");
  } catch (error) {
    reply.status(500).send({ error: error.message });
  }
};

const ProductionFindoneHandler = async (req, reply) => {
  try {
    const id = { _id: req.params.id };
    const production = await ProductionModel.find(id, {
      isDeleted: false,
    })
      .populate({
        path: "machine",
        model: MachineModel,
      })
      .populate({
        path: "customer",
        model: CustomerModel,
      });
    console.log(production, "production");
    const productiondtl = await ProductiondtlModel.find({
      production: production[0]._id,
      isDeleted: false,
    }).populate({
      path: "product",
      model: ProductModel,
    });

    production[0]?.Productiondtl.push(...productiondtl);

    return production;
  } catch (err) {
    reply.status(500).send({ error: err.message });
  }
};

const ProductionFindallHandler = async (req, res) => {
  try {
    const production = await ProductiondtlModel.find({
      isDeleted: false,
    })
      .populate({
        path: "product",
        model: ProductModel,
      })
      .populate({
        path: "production",
        model: ProductionModel,
        populate: [
          { path: "machine", model: MachineModel },
          { path: "customer", model: CustomerModel },
        ],
      });
    return production;
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
};

const ProductiondtlBydateHandler = async (req, reply) => {
  try {
    const fromDate = moment(req.body.fromDate).startOf("day");
    const toDate = moment(req.body.toDate).endOf("day");
    const customerid = req.body.customer_id;
    if (customerid == "") {
      return await ProductiondtlModel.find({
        date: {
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
          path: "production",
          model: ProductionModel,
          populate: [
            { path: "machine", model: MachineModel },
            { path: "customer", model: CustomerModel },
          ],
        });
    } else {
      const production = await ProductionModel.findOne({
        customer: customerid,
        isDeleted: false,
      });

      return await ProductiondtlModel.find({
        production: production._id,
        date: {
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
          path: "production",
          model: ProductionModel,
          populate: [
            { path: "machine", model: MachineModel },
            { path: "customer", model: CustomerModel },
          ],
        });
    }
  } catch (err) {
    reply.status(500).send({ error: err.message });
  }
};
const ProductiondeleteoneHandler = async (req, reply) => {
  try {
    const id = req.params.id;
    console.log(id);

    const production = await ProductionModel.findById(id);
    console.log(production);
    const deleteone = await ProductionModel.findByIdAndUpdate(id, {
      isDeleted: true,
    });
    console.log(deleteone);
    await ProductiondtlModel.updateMany(
      { production: deleteone._id },
      { isDeleted: true }
    );
    reply.status(201).send("Deleted sucessfully!");
  } catch (err) {
    reply.status(500).send({ error: err.message });
  }
};

const Productiondeleteall = async (req, reply) => {
  try {
    const deleteall = await ProductionModel.deleteMany({});
    const deleteall2 = await ProductiondtlModel.deleteMany({});
    reply.status(200).send("All Records Deleted Sucessfully!");
  } catch (err) {
    reply.status(500).send({ error: err.message });
  }
};

const ProductupdatebyidHandler = async (req, reply) => {
  try {
    const id = { _id: req.params.id };
    const {
      tran,
      date,
      productiontype,
      specialInstruction,
      machine,
      customer,
      Productiondtl,
    } = req.body;
    const production = await ProductionModel.findByIdAndUpdate(id, {
      tran,
      date: moment(date).format("YYYY-MM-DD"),
      productionType: productiontype,
      machine: new mongoose.Types.ObjectId(machine),
      customer: new mongoose.Types.ObjectId(customer),
      specialInstruction,
    });

    await ProductiondtlModel.deleteMany({ production: id });

    for (const prod of Productiondtl) {
      const newProdDtl = await ProductiondtlModel.create({
        date: moment(date).format("YYYY-MM-DD"),
        lot: prod.lot,
        bales: prod.bales,
        qty: prod.qty,
        uom: prod.uom,
        product: new mongoose.Types.ObjectId(prod.product),
        production: new mongoose.Types.ObjectId(production._id),
      });
    }
    return reply.status(200).send("Sucessfully updated!");
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
};

module.exports = {
  createProductionHandler,
  ProductionFindoneHandler,
  ProductionFindallHandler,
  ProductiondtlBydateHandler,
  ProductiondeleteoneHandler,
  Productiondeleteall,
  ProductupdatebyidHandler,
};
