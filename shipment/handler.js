const ShipmentdtlModel = require("./shipmentdtlSchema");
const ShipmentModel = require("./shipmentSchema.js");
const ProductModel = require("../product/productSchema.js");
const CurrencyModel = require("../currency/currancySchema.js");
const SalesContractModel = require("../salescontract/salescontractSchema");
const SaleContractdtlModel = require("../salescontract/salescontractdtlSchema");
const mongoose = require("mongoose");
const moment = require("moment");
const CustomerModel = require("../customer/customerSchema");
const BrandModel = require("../brand/brandSchema");
const ShipViaModel = require("../shipVia/shipviamodel");

const createShipmentHandler = async (req, reply) => {
  try {
    const {
      shipmentNumber,
      gpNumber,
      gpDate,
      dcNumber,
      dcDate,
      salesContract,
      ShipmentDtl,
      specialInstruction,
      shippedQty,
    } = req.body;

    const create = await ShipmentModel.create({
      shipment: shipmentNumber,
      gpNumber: gpNumber,
      gpDate: moment(gpDate).format("YYYY-MM-DD"),
      dcNumber: dcNumber,
      dcDate: moment(dcDate).format("YYYY-MM-DD"),
      salesContract: salesContract,
      ShipmentDtl,
      specialInstruction: specialInstruction,
      shippedQty: shippedQty,
    });
    for (const shipDtl of ShipmentDtl) {
      const newshipdtl = await ShipmentdtlModel.create({
        shipment: shipmentNumber,
        qty: shipDtl.qty,
        rate: shipDtl.rate,
        gpDate: moment(gpDate).format("YYYY-MM-DD"),
        amount: +shipDtl.qty * +shipDtl.rate,
        uom: shipDtl.uom,
        product: new mongoose.Types.ObjectId(shipDtl.product),
        currency: new mongoose.Types.ObjectId(shipDtl.currency),
        shipment: new mongoose.Types.ObjectId(create._id),
        customer: new mongoose.Types.ObjectId(shipDtl.customer),
        salesContract: new mongoose.Types.ObjectId(salesContract),
      });
      const sales = await SalesContractModel.findByIdAndUpdate(salesContract, {
        shipment: true,
      });
      const salesContractDetails = await SaleContractdtlModel.updateMany(
        { salesContract: salesContract },
        {
          shipment: true,
        }
      );
    }
    return reply.status(200).send("Sucessfully inserted");
  } catch (err) {
    reply.status(500).send({ error: err.message });
  }
};
const ShipmentfindoneByidHandler = async (req, reply) => {
  try {
    const id = new mongoose.Types.ObjectId(req.params.id);

    const shipment = await ShipmentModel.aggregate([
      {
        $match: {
          isDeleted: false,
          _id: id,
        },
      },
      {
        $lookup: {
          from: "salescontracts",
          localField: "salesContract",
          foreignField: "_id",
          as: "salesContract",
          pipeline: [
            {
              $lookup: {
                from: "customers",
                localField: "customer",
                foreignField: "_id",
                as: "customer",
              },
            },
          ],
        },
      },
      {
        $lookup: {
          from: "shipmentdtls",
          localField: "_id",
          foreignField: "shipment",
          as: "shipment",
          pipeline: [
            {
              $lookup: {
                from: "products",
                localField: "product",
                foreignField: "_id",
                as: "product",
              },
            },
            {
              $lookup: {
                from: "currencies",
                localField: "currency",
                foreignField: "_id",
                as: "currency",
              },
            },
          ],
        },
      },
    ]);
    return shipment;
  } catch (err) {
    reply.status(500).send({ error: err.message });
  }
};
const ShipmentdtlfindallHandler = async (req, reply) => {
  try {
    const shipdtl = await ShipmentdtlModel.find({ isDeleted: false })
      .populate({
        path: "product",
        model: ProductModel,
      })
      .populate({
        path: "currency",
        model: CurrencyModel,
      })
      .populate({
        path: "shipment",
        model: ShipmentModel,
        populate: [
          {
            path: "salesContract",
            model: SalesContractModel,
            populate: {
              path: "customer",
              model: CustomerModel,
            },
          },
        ],
      });
    return shipdtl;
  } catch (err) {
    reply.status(500).send({ error: err.message });
  }
};

const ShipmentdtlsfindByDateHandler = async (req, reply) => {
  try {
    const fromDate = moment(req.body.fromDate).startOf("day");
    const toDate = moment(req.body.toDate).endOf("day");
    const salecontractid = req.body.salesContract_id;

    if (!salecontractid) {
      const sales = await ShipmentdtlModel.find({
        gpDate: {
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
          path: "shipment",
          model: ShipmentModel,

          populate: [
            {
              path: "salesContract",
              model: SalesContractModel,
              populate: [
                { path: "customer", model: CustomerModel },
                { path: "brand", model: BrandModel },
                { path: "shipvia", model: ShipViaModel },
              ],
            },
          ],
        });
      return sales;
    } else {
      const saleContract = await ShipmentModel.findOne({
        salesContract: salecontractid,
        isDeleted: false,
      });
     

      const sales = await ShipmentdtlModel.find({
        shipment: saleContract._id,
        gpDate: {
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
          path: "shipment",
          model: ShipmentModel,

          populate: [
            {
              path: "salesContract",
              model: SalesContractModel,
              populate: [
                { path: "customer", model: CustomerModel },
                { path: "brand", model: BrandModel },
                { path: "shipvia", model: ShipViaModel },
              ],
            },
          ],
        });

      return sales;
    }
  } catch (err) {
    reply.status(500).send({ error: err.message });
  }
};

const ShipmentdeleteOneHandler = async (req, reply) => {
  try {
    const id = { _id: req.params.id };

    const ship = await ShipmentModel.findById(id);
    const shipmentdelete = await ShipmentModel.findByIdAndUpdate(id, {
      isDeleted: true,
    });
    const shipmentdtl = await ShipmentdtlModel.updateOne({
      shipment: ship._id,
      isDeleted: true,
    });
    reply.status(200).send("delete sucessfully!");
  } catch (err) {
    reply.status(500).send({ message: err.message });
  }
};
const ShipmentDeleteallHandler = async (req, reply) => {
  try {
    const shipment = await ShipmentModel.deleteMany({});
    const shipmentdtl = await ShipmentdtlModel.deleteMany({});
    return reply.status(200).send("shipments delete Sucessfully!");
  } catch (err) {
    reply.status(500).send({ message: err.message });
  }
};

const ShipmentupdatebyidHandler = async (req, reply) => {
  try {
    const id = { _id: req.params.id };
    const {
      shipmentNumber,
      gpNumber,
      gpDate,
      dcNumber,
      dcDate,
      salesContract,
      ShipmentDtl,
      specialInstruction,
      shippedQty,
    } = req.body;
    const create = await ShipmentModel.findByIdAndUpdate(id, {
      shipment: shipmentNumber,
      gpNumber: gpNumber,
      gpDate: moment(gpDate).format("YYYY-MM-DD"),
      dcNumber: dcNumber,
      dcDate: moment(dcDate).format("YYYY-MM-DD"),
      salesContract: salesContract,
      ShipmentDtl,
      specialInstruction: specialInstruction,
      shippedQty: shippedQty,
    });
    await ShipmentdtlModel.deleteMany({ shipment: id });
    for (const shipDtl of ShipmentDtl) {
      const newshipdtl = await ShipmentdtlModel.create({
        qty: shipDtl.qty,
        rate: shipDtl.rate,
        gpDate: moment(gpDate).format("YYYY-MM-DD"),
        amount: +shipDtl.qty * +shipDtl.rate,
        uom: shipDtl.uom,
        product: new mongoose.Types.ObjectId(shipDtl.product),
        currency: new mongoose.Types.ObjectId(shipDtl.currency),
        shipment: new mongoose.Types.ObjectId(create._id),
        customer: new mongoose.Types.ObjectId(shipDtl.customer),
      });
    }
    return reply.status(200).send("Sucessfully updated!");
  } catch (err) {
    reply.status(500).send({ message: err.message });
  }
};

const ShipmentDtlReportHandler = async (req, reply) => {
  try {
    
    if (
      Array.isArray(req.body.salesContract) &&
      req.body.salesContract.length === 0 &&
      Array.isArray(req.body.customer) &&
      req.body.customer.length === 0 &&
      Array.isArray(req.body.product) &&
      req.body.product.length === 0
    ) {
      
      let where = {};

      const fromDate = moment(req.body.fromDate).startOf("day");
      const toDate = moment(req.body.toDate).endOf("day");
      const limit = req.body.perPage;
      const skipCount = (req.body.pageno - 1) * limit;
    
      where = {
        gpDate: {
          $gte: fromDate.toDate(),
          $lte: toDate.toDate(),
        },
        isDeleted: false,
      };
      const total_record = await ShipmentdtlModel.aggregate([
        {
          $match: where,
        },
      ]);
      const Shipmentdtl = await ShipmentdtlModel.aggregate([
        {
          $match: where,
        },

        {
          $lookup: {
            from: "shipments",
            localField: "shipment",
            foreignField: "_id",
            as: "shipment",
          },
        },
        {
          $lookup: {
            from: "salescontracts",
            localField: "salesContract",
            foreignField: "_id",
            as: "salecontractdtl",
          },
        },
        {
          $lookup: {
            from: "products",
            localField: "product",
            foreignField: "_id",
            as: "product_dtl",
          },
        },
        {
          $lookup: {
            from: "customers",
            localField: "customer",
            foreignField: "_id",
            as: "customer",
          },
        },
        { $skip: skipCount },
        { $limit: limit },
        { $sort: { shipment: 1 } },
      ]);
      let result = {
        // message: "Successfully retrieved id!",
        Shipmentdtl: Shipmentdtl,
        total_records: total_record.length,
        paginated_record: Shipmentdtl.length,
      };

      return result;
    } 
    else if (Array.isArray(req.body.salesContract) && req.body.salesContract.length > 0 || Array.isArray(req.body.customer) && req.body.customer.length > 0 || Array.isArray(req.body.product) && req.body.product.length > 0) {

      let where = {};
      let  filter = {};
      let  filter_group = {};
      const fromDate = moment(req.body.fromDate).startOf("day");
      const toDate = moment(req.body.toDate).endOf("day");
      const limit = req.body.perPage;
      const skipCount = (req.body.pageno - 1) * limit;
      const salecontractArr = req.body.salesContract ? req.body.salesContract.map((id) => new mongoose.Types.ObjectId(id)): [];


      const customerArr = req.body.customer ? req.body.customer.map((id) => new mongoose.Types.ObjectId(id)) : [];
      const productArr = req.body.product ? req.body.product.map((id) => new mongoose.Types.ObjectId(id)) : [];

      if (salecontractArr.length > 0 && productArr.length > 0 && customerArr.length > 0) {



        where.$and = [
          {
            salesContract: { $in: salecontractArr },
            customer: { $in: customerArr },
            product: { $in: productArr },
          },
        ];
        filter = {
          product: { $in: productArr },
          customer: { $in: customerArr },
          salesContract: { $in: salecontractArr },
        };
        filter_group.$and = [
          {
            customer: { $in: customerArr },
            salesContract: { $in: salecontractArr },
            product: { $in: productArr },
          },
        ];
      }
     else if (salecontractArr.length > 0 && customerArr.length > 0) {
  
      where.$and = [
        {
          salesContract: { $in: salecontractArr },
          customer: { $in: customerArr },
        },
      ];
      filter = {
        customer: { $in: customerArr },
        salesContract: { $in: salecontractArr },
      };
      filter_group.$and = [
        {
          customer: { $in: customerArr },
          salesContract: { $in: salecontractArr },
        },
      ];
    }
     else if (salecontractArr.length > 0 && productArr.length > 0) {
  
      where.$and = [
        {
          salesContract: { $in: salecontractArr },
          product: { $in: productArr },
        },
      ];
      filter = {
        product: { $in: productArr },
        salesContract: { $in: salecontractArr },
      };
      filter_group.$and = [
        {
          product: { $in: productArr },
          salesContract: { $in: salecontractArr },
        },
      ];
    } else if (customerArr.length > 0 && productArr.length > 0) {
 
      where.$and = [
        {
          customer: { $in: customerArr },
          product: { $in: productArr },
        },
      ];
      filter = {
        product: { $in: productArr },
        customer: { $in: customerArr },
      };
      filter_group.$and = [
        {
          customer: { $in: customerArr },

          product: { $in: productArr },
        },
      ];
    } else if (salecontractArr.length > 0) {
     

      where = {
        salesContract: { $in: salecontractArr },
      };

      filter = {
        salesContract: { $in: salecontractArr },
      };
      filter_group = {
        salesContract: { $in: salecontractArr },
      };
    } else if (customerArr.length > 0) {
    
      where = {
        customer: { $in: customerArr },
      };

      filter = {
        customer: { $in: customerArr },
      };
      filter_group = {
        customer: { $in: customerArr },
      };
    } else if (productArr.length > 0) {
  
      where = {
        product: { $in: productArr },
      };

      filter = {
        product: { $in: productArr },
      };
      filter_group = {
        product: { $in: productArr },
      };
    }
const total_records= await ShipmentdtlModel.aggregate([
  {
    $match:{
      gpDate:{
        $gte: new Date(req.body.fromDate),
        $lte: new Date(req.body.toDate),
      },
      isDeleted:false
    }
  },{
    $match:filter_group
  }
])

  const group_by = await ShipmentdtlModel.aggregate([
    {
      $match:{
        gpDate:{
          $gte: fromDate.toDate(),
          $lte: toDate.toDate(),
        },
        isDeleted:false
      }
    },
    {
    $match:filter
    },
      {
        $group: {
          _id: 'null',
          rate: {
            $sum: '$rate',
          },
          amount: {
            $sum: '$amount',
          },
          qty: {
            $sum: '$qty',
          },
        },
      
    }
  ])
  const totalQty = group_by.map((item) => item.qty);
const totalRate = group_by.map((item) => item.rate);
const totalAmount = group_by.map((item) => item.amount);


const ShipmentDtl =  await ShipmentdtlModel.aggregate([
  {
    $match:{
      gpDate:{
        $gte: fromDate.toDate(),
        $lte: toDate.toDate()
      },
      isDeleted:false
    }
  },
  {
    $match: where,
  },

  {
    $lookup: {
      from: "shipments",
      localField: "shipment",
      foreignField: "_id",
      as: "shipment",
    },
  },
  {
    $lookup: {
      from: "salescontracts",
      localField: "salesContract",
      foreignField: "_id",
      as: "salecontractdtl",
    },
  },
  {
    $lookup: {
      from: "products",
      localField: "product",
      foreignField: "_id",
      as: "product_dtl",
    },
  },
  {
    $lookup: {
      from: "customers",
      localField: "customer",
      foreignField: "_id",
      as: "customer",
    },
  },
  { $skip: skipCount },
  { $limit: limit },
  { $sort: { shipment: 1 } },
]) 
let result = {
  Shipmentdtl: ShipmentDtl,
  total_records: total_records.length,
  paginated_record: ShipmentDtl.length,
  totalQty:totalQty,
  totalAmount:totalAmount,
  totalRate:totalRate
};

return result

    }
  } catch (err) {
    reply.status(500).send({ error: err.message });
  }
};

module.exports = {
  createShipmentHandler,
  ShipmentfindoneByidHandler,
  ShipmentdtlfindallHandler,
  ShipmentdtlsfindByDateHandler,
  ShipmentdeleteOneHandler,
  ShipmentDeleteallHandler,
  ShipmentupdatebyidHandler,
  ShipmentDtlReportHandler,
};
