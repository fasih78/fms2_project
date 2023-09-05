const CityModel = require("../city/citySchema.js");
const CountryModel = require("../country/countrySchema.js");
const StateModel = require("../state/stateSchema.js");
const CustomerModel = require("./customerSchema.js");
const moment = require("moment");

const createCustomerHandler = async (req, reply) => {
  try {
    let Date1 = new Date();
    const LastUser = await CustomerModel.findOne().sort({ _id: -1 }).exec();
    const id = LastUser ? LastUser.id + 1 : 1;
    let {
      name,
      title,
      contact,
      phone,
      email,
      address,
      zipcode,
      saletaxreg,
      country,
      city,
      state,
      ntn,
    } = req.body;

    {
      let create = await CustomerModel.create({
        id,
        name,
        title,
        contact,
        phone,
        email,
        address,
        zipcode,
        saletaxreg,
        country,
        city,
        state,
        Date1: moment(Date1).format("YYYY-MM-DD"),
        ntn,
      });
      await create.save();
      return reply.status(201).send("Customer Have Saved Sucessfully!");
    }
  } catch (err) {
    reply.status(500).send({ error: err.message });
  }
};

const CustomerDeleteallHandler = async (req, reply) => {
  try {
    const deleteall = await CustomerModel.deleteMany({});
    return reply.status(201).send("All Record Deleted Sucessfully!");
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
};
const CustomerDeletebyidHandler = async (req, res) => {
  try {
    let myquery = { _id: req.params.id };
    const DeleteById = await CustomerModel.findByIdAndUpdate(myquery, {
      isDeleted: true,
    }).exec();

    return reply.status(200).send("Sucessfully Deleted!");
  } catch (err) {
    reply.status(500).send({ error: err.message });
  }
};

const CustomerfindbyIdHandler = async (req, reply) => {
  try {
    const id = { _id: req.params.id };
    console.log(req.params.id);
    const customer = await CustomerModel.find(id, {
      isDeleted: false,
    })
      .populate({
        path: "city",
        model: CityModel,
      })
      .populate({
        path: "state",
        model: StateModel,
      })
      .populate({
        path: "country",
        model: CountryModel,
      });
    return customer;
  } catch (err) {
    reply.status(500).send({ error: err.message });
  }
};

const CustomerfindallHandler = async (req, reply) => {
  try {
    const customer = await CustomerModel.find({ isDeleted: false })
      .populate({
        path: "city",
        model: CityModel,
      })
      .populate({
        path: "state",
        model: StateModel,
      })
      .populate({
        path: "country",
        model: CountryModel,
      });
    return customer;
  } catch (error) {
    reply.status(500).send({ error: err.message });
  }
};

const CustomerupdateByIdHandler = async (req, reply) => {
  try {
    let = {
      name,
      title,
      contact,
      phone,
      email,
      address,
      city,
      state,
      country,
      zipcode,
      saletaxreg,
      ntn,
    } = req.body;

    const id = { _id: req.params.id };
    const updateCustomer = await CustomerModel.findByIdAndUpdate(id, {
      name,
      title,
      contact,
      phone,
      email,
      address,
      zipcode,
      saletaxreg,
      city: new mongoose.Types.ObjectId(city),
      state: new mongoose.Types.ObjectId(state),
      country: new mongoose.Types.ObjectId(country),
      ntn,
    });
    return reply.status(200).send("updated sucessfully!");
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
};

module.exports = {
  createCustomerHandler,
  CustomerfindbyIdHandler,
  CustomerfindallHandler,
  CustomerDeletebyidHandler,
  CustomerDeleteallHandler,
  CustomerupdateByIdHandler,
};
