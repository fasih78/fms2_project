const UserModel = require("./userSchema.js");
const fastify = require("fastify")({ logger: true });
const bcrypt = require("bcrypt");
const saltRounds = 10;
const validator = require("validator");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const UserSignUp = async (req, reply) => {
  try {
    const { name, email, password } = req.body;

    const salt = bcrypt.genSaltSync(saltRounds);
    const hash = bcrypt.hashSync(password, salt);

    const userExists = await UserModel.findOne({ email: email });
    const validation = validator.isEmail(email);

    if (userExists) {
      return reply.status(404).send({ message: "User Already Exists!" });
    } else if (!validation) {
      return reply.status(400).send({ message: "Invalid Email!" });
    }

    const LastUser = await UserModel.findOne().sort({ _id: -1 }).exec();
    const id = LastUser ? LastUser.id + 1 : 1;

    const token = jwt.sign({ email: email }, process.env.JWT_SECRET_KEY, {
      expiresIn: "365d",
    });
    try {
      const newUser = await UserModel.create({
        id: id,
        name: name,
        email: email,
        password: hash,
        salt: salt,
      });
      await newUser.save();
      return reply.status(201).send({
        success: true,
        message: "SignUp Successfully!",
        data: newUser,
        token: token,
      });
    } catch (error) {
      reply.status(500).send({ error: "An error occurred" });
    }
  } catch (error) {
    return reply.status(500).send({ error: error.message });
  }
};

const UserLogin = async (req, reply) => {
  try {
    const { email, password } = req.body;
    const findemail = await UserModel.findOne({ email: email }).exec();
    console.log(findemail);
    if (findemail) {
      const hash = findemail.password;
      const passwordcompared = await bcrypt.compare(password, hash);
      console.log(passwordcompared);
      if (passwordcompared) {
        const findpassword = await UserModel.findOne({
          password: passwordcompared,
        }).exec();
        console.log("RUNNING");
        return reply.status(200).send("Login successful!");
      } else {
        return reply.send("Wrong Password!");
      }
    } else {
      return reply.send("Invalid Email Address!");
    }
  } catch (err) {
    return reply.status(500).send({ error: err.message });
  }
};

const UserCreateone = async (request, reply) => {
  try {
    let id = { _id: request.params.id };
    console.log(id);
    const finddd = await UserModel.findById(id);
    console.log(finddd);
    return finddd;
  } catch (error) {
    return reply.code(500).send({ error: error.message });
  }
};

const user_ResetPassword = async (req, reply) => {
  try {
    const { email, password, newpassword } = req.body;

    const userExists = await UserModel.findOne({ email: email });

    if (!userExists) {
      return reply.status(404).send({ message: "User not Exists!" });
    }

    const hash = userExists.password;
    const passwordcompared = await bcrypt.compare(password, hash);

    if (passwordcompared === false) {
      return reply.status(400).send("Incorrect password!");
    }

    const validation = validator.isEmail(email);

    if (!validation) {
      return reply.status(400).send({ message: "Invalid Email!" });
    }

    const salt = bcrypt.genSaltSync(saltRounds);
    const hash2 = bcrypt.hashSync(newpassword, salt);
    const updatepassword = await UserModel.updateMany(
      {
        email: email,
      },
      {
        password: hash2,
        salt: salt,
      }
    );

    return reply.status(201).send("Your Password Reset Successfully!");
  } catch (error) {
    return reply.status(500).send(error);
  }
};

module.exports = { UserSignUp, UserLogin, UserCreateone, user_ResetPassword };
