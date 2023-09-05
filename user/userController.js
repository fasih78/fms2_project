const mongoose = require("mongoose");
const UserModel = require("./userSchema.js");
const { request } = require("express");
const fastify = require("fastify")({ logger: true });
const {
  UserSignUp,
  UserLogin,
  UserCreateone,
  user_ResetPassword,
} = require("./handler.js");
const Auth_user = require("../Authorized_Jwt.js");
const JWT = require("jsonwebtoken");

const routes = async (fastify, opts, done) => {
  fastify.post("/SignUp", {
    schema: {
      description: "Sign up route",
      tags: ["User"],

      summary: "Create a new user",
      body: {
        type: "object",
        properties: {
          name: {
            type: "string",
            description: "Name of the user",
          },
          email: {
            type: "string",
            description: "email of the user",
          },
          password: {
            type: "string",
            description: "passsword oof user",
          },
        },
        required: ["email"],
        required: ["name"],
        required: ["password"],
      },
      response: {
        200: {
          description: "Successfully Registered",
          type: "object",
          properties: {
            message: { type: "string" },
            user: {
              type: "object",
              properties: {
                name: { type: "string" },
                email: { type: "string" },
                password: { type: "string" },
              },
            },
          },
        },
      },
    },
    handler: UserSignUp,
  });

  fastify.get("/UserGetone/:id", {
    schema: {
      tags: ["User"],
      description: "Retrieve a user by its ID",
      summary: "Get one user",
      params: {
        type: "object",
        properties: {
          id: {
            type: "string",
            description: "id required",
          },
        },
        required: ["id"],
      },
      response: {
        200: {
          description: "Successfully retrieved user",
          type: "object",
          properties: {
            id: {
              type: "string",
            },
            name: {
              type: "string",
            },
          },
        },
      },
    },
    handler: UserCreateone,
  });

  fastify.post("/Login", {
    schema: {
      tags: ["User"],
      description: "login",
      summary: "Login User",
      body: {
        type: "object",
        properties: {
          email: {
            type: "string",
            description: "email of the user",
          },
          password: {
            type: "string",
            description: "passsword oof user",
          },
        },
        required: ["email"],
        required: ["password"],
      },

      response: {
        200: {
          description: "Successfully user log inn",
          type: "object",
        },
      },
    },
    handler: UserLogin,
  });

  fastify.post("/Resetpassword", {
    schema: {
      description: "user reset our password",
      summary: "reset password by prviding email and old password",
      tags: ["User"],
      body: {
        type: "object",
        properties: {
          email: {
            type: "string",
            description: "email of user",
          },
          password: {
            type: "string",
            description: "old password of user",
          },
          newpassword: {
            type: "string",
            description: "new passwor of user",
          },
        },
        required: ["email"],
        required: ["password"],
        required: ["newpassword"],
      },
      response: {
        200: {
          description: "Sucessfully reset your password",
          type: "object",
        },
      },
    },
    handler:user_ResetPassword
  });

  done();
};

module.exports = routes;
