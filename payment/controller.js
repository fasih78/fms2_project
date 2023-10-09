const {
  createPaymentHandler,
  PaymentfindoneHandler,
  PaymentfindallHandler,
  PaymentDeleteoneHandler,
  PaymentDeleteallHandler,
  PaymentupdatebyidHandler,
} = require("./handler.js");

const routes = async (fastify, option, done) => {
  fastify.route({
    method: "POST",
    url: "/Payment",
    schema: {
      description: "create Payment",
      tags: ["Payment"],
      summary: "Create Payment ",
      body: {
        type: "object",
        properties: {
          paymentReceivedDate: {
            type: "string",
            description: "payment date",
          },
          cheaqueNo: {
            type: "string",
            description: "cheaqueNo ",
          },
          specialInstruction: {
            type: "string",
            description: "specialInstruction",
          },
          invoice: {
            type: "string",
            description: "invoice object id",
          },
        },
      },
    },
    response: {
      200: {
        description: "Payment Created",
        properties: {
          message: { type: "string" },
        },
      },
    },
    handler: createPaymentHandler,
  });

  fastify.route({
    method: "GET",
    url: "/Payment/getone/:id",
    schema: {
      tags: ["Payment"],
      description: "Retrieve a Payment by its ID",
      summary: "Get one Payment",
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
    handler: PaymentfindoneHandler,
  });

  fastify.route({
    method: "GET",
    url: "/Payment/getall",
    schema: {
      description: "Get all Payment",
      tags: ["Payment"],
      summary: "Get all Payment",
      response: {
        200: {
          description: "Successfully retrieved Payment",
          // type: "object",

          type: "array",
          properties: {
            // type:"object",
            id: {
              type: "number",
            },
            Name: {
              type: "string",
            },
          },
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

    handler: PaymentfindallHandler,
  });

  fastify.route({
    method: "DELETE",
    url: "/Payment/deleteone/:id",
    schema: {
      tags: ["Payment"],
      description: "Retrieve a Payment by its ID",
      summary: "delete one",
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
          description: "Successfully delete Payment",
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
    handler: PaymentDeleteoneHandler,
  });

  fastify.route({
    method: "DELETE",
    url: "/Payment/deletall",
    schema: {
      description: " Delete all Payment",
      tags: ["Payment"],
      summary: "Delete all Payment",
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
    handler: PaymentDeleteallHandler,
  });

  fastify.route({
    method: "PUT",
    url: "/Payment/UPDATE/:id",
    schema: {
      discription: "Payment update",
      summary: " Payment update api",
      tags: ["Payment"],
      params: {
        type: "object",
        properties: {
          paymentReceivedDate: {
            type: "string",
            description: "payment date",
          },
          cheaqueNo: {
            type: "string",
            description: "cheaqueNo ",
          },
          specialInstruction: {
            type: "string",
            description: "specialInstruction",
          },
          invoice: {
            type: "string",
            description: "invoice object id",
          },
        },
      },
      body: {
        type: "object",
        properties: {
          name: {
            type: "string",
            description: "name of currency",
          },
        },
        required: ["name"],
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
    handler: PaymentupdatebyidHandler,
  });

  done();
};

module.exports = routes;
