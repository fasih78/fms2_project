const {
  createCustomerHandler,
  CustomerfindbyIdHandler,
  CustomerfindallHandler,
  CustomerDeletebyidHandler,
  CustomerDeleteallHandler,
  CustomerupdateByIdHandler,
} = require("./handler.js");

const routes = async (fastify, option, done) => {
  fastify.route({
    method: "POST",
    url: "/Customer",
    schema: {
      description: "create customer",
      tags: ["Customer"],
      summary: "Create customer",
      body: {
        type: "object",
        properties: {
          name: {
            type: "string",
            description: "name of customer",
          },
          title: {
            type: "string",
            description: "title of customer",
          },
          contact: {
            type: "string",
            description: "contact of customer",
          },
          phone: {
            type: "string",
            description: "phone of customer",
          },
          email: {
            type: "string",
            description: "email of customer",
          },
          zipcode: {
            type: "string",
            description: "zipcode of customer",
          },
          saletaxreg: {
            type: "string",
            description: "saletaxreg of customer",
          },
          country: {
            type: "string",
            description: "country of customer",
          },
          city: {
            type: "string",
            description: "city of customer",
          },
          state: {
            type: "string",
            description: "state of customer",
          },
          Date: {
            type: "string",
            description: "Date of customer",
          },
          ntn: {
            type: "string",
            description: "ntn of customer",
          },
        },
        required: ["name"],
      },
      response: {
        200: {
          description: "customer Created",
          type: "object",
          properties: {
            message: { type: "string" },
          },
        },
      },
    },
    handler: createCustomerHandler,
  });
  fastify.route({
    method: "GET",
    url: "/Customergetone/:id",
    schema: {
      description: "customer get one",
      summary: "get one",
      tags: ["Customer"],
      params: {
        type: "object",
        properties: {
          id: {
            type: "string",
            description: "id required",
          },
        },
        //  required: ["id"],
      },
      response: {
        200: {
          description: "Successfully retrieved currency",
          type: "array",
          properties: {
            id: {
              type: "string",
            },
            Name: {
              type: "string",
            },
          },
        },
      },
    },
    handler: CustomerfindbyIdHandler,
  });

  fastify.route({
    method: "GET",
    url: "/Customergetall",
    schema: {
      discription: "city update",
      summary: "city update api",
      tags: ["Customer"],
      response: {
        200: {
          description: "Successfully retrieved customer",
          type: "array",
        },
        500: {
          description: "Internal Server Error",
          type: "object",
          properties: {
            error: {
              type: "string",
            },
          },
        },
      },
    },
    handler: CustomerfindallHandler,
  });

  fastify.route({
    method: "DELETE",
    url: "/CustomerDeleteone/:id",
    schema: {
      description: "customer delete one",
      summary: "Customer delete one Record",
      tags: ["Customer"],
      params: {
        type: "object",
        properties: {
          id: {
            type: "string",
            description: "customer id",
          },
        },
        required: ["id"],
      },
      response: {
        200: {
          description: "Successfully delete city",
          type: "object",
          properties: {
            id: {
              type: "number",
            },
            Name: {
              type: "string",
            },
          },
        },
      },
    },
    handler: CustomerDeletebyidHandler,
  });
  fastify.route({
    method: "DELETE",
    url: "/CustomerDeleteall",
    schema: {
      description: "Customer delete all",
      summary: "customer delete all",
      tags: ["Customer"],
      response: {
        200: {
          description: "Successfully DELETED",
          type: "object",
        },
        500: {
          description: "Internal Server Error",
          type: "object",
          properties: {
            error: {
              type: "string",
            },
          },
        },
      },
    },
    handler: CustomerDeleteallHandler,
  });

  fastify.route({
    method: "PUT",
    url: "/CustomerupdateById/:id",
    schema: {
      discription: "customer update",
      summary: "customer update api",
      tags: ["Customer"],
      params: {
        type: "object",
        properties: {
          id: {
            type: "string",
            description: "customer id",
          },
        },
        required: ["id"],
      },
      body: {
        type: "object",
        properties: {
          name: {
            type: "string",
            description: "name of customer",
          },
          title: {
            type: "string",
            description: "title of customer",
          },
          contact: {
            type: "string",
            description: "contact of customer",
          },
          phone: {
            type: "string",
            description: "phone of customer",
          },
          email: {
            type: "string",
            description: "email of customer",
          },
          zipcode: {
            type: "string",
            description: "zipcode of customer",
          },
          saletaxreg: {
            type: "string",
            description: "saletaxreg of customer",
          },
          country: {
            type: "string",
            description: "country of customer",
          },
          city: {
            type: "string",
            description: "city of customer",
          },
          state: {
            type: "string",
            description: "state of customer",
          },
          Date: {
            type: "string",
            description: "Date of customer",
          },
          ntn: {
            type: "string",
            description: "ntn of customer",
          },
        },
      },
      response: {
        200: {
          description: "Successfully updated!",
          type: "object",
          properties: {
            id: {
              type: "string",
            },
            Name: {
              type: "string",
            },
          },
        },
      },
    },
    handler: CustomerupdateByIdHandler,
  });
  done();
};

module.exports = routes;
