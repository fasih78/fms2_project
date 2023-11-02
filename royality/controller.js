const {
  CreateRoyalityHandler,
  RoyalityFindAllHandler,
  RoyalityDeleteOneHandler,
  RoyalityDeleteAllHandler,
  RoyalityUpdateOneHandler,
  RoyalityReportdtlHandler,
} = require("./handler.js");

const routes = async (fastify, option, done) => {
  fastify.route({
    method: "POST",
    url: "/Royality",
    schema: {
      description: "create Royality",
      tags: ["Royality"],
      summary: "Create Royality ",
      body: {
        type: "object",
        properties: {
          payment: {
            type: "string",
            description: "payment object id",
          },
          customer: {
            type: "string",
            description: "customer object id ",
          },
          saleContract: {
            type: "string",
            description: "saleContract object id",
          },
          invoice: {
            type: "string",
            description: "Royality object id",
          },
          saleTaxinvoicedate: {
            type: "string",
            description: "Royality Date",
          },
        },
      },
    },
    response: {
      200: {
        description: "Royality Created",
        properties: {
          message: { type: "string" },
        },
      },
    },
    handler: CreateRoyalityHandler,
  });
  fastify.route({
    method: "GET",
    url: "/Royality/getall",
    schema: {
      description: "Get all Royality",
      tags: ["Royality"],
      summary: "Get all Royality",
      response: {
        200: {
          description: "Successfully retrieved Royality",
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

    handler: RoyalityFindAllHandler,
  });

  fastify.route({
    method: "DELETE",
    url: "/Royality/deleteone/:id",
    schema: {
      description: "royality delete one",
      summary: "royality delete one",
      tags: ["Royality"],
      params: {
        type: "object",
        properties: {
          id: {
            type: "string",
            description: "royality id",
          },
        },
        required: ["id"],
      },
      response: {
        200: {
          type: "object",
          description: "sucessfully reterived id!",
          properties: {
            message: {
              type: "string",
              description: "sucess",
            },
          },
        },
      },
    },
    handler: RoyalityDeleteOneHandler,
  });

  fastify.route({
    method: "DELETE",
    url: "/Royality/deleteall",
    schema: {
      description: "royality",
      summary: "royality delete all",
      tags: ["Royality"],
      response: {
        200: {
          type: "array",
          description: "sucessfully reterived id!",
          properties: {
            message: {
              type: "string",
              description: "sucess",
            },
          },
        },
      },
    },
    handler: RoyalityDeleteAllHandler,
  });

  fastify.route({
    method: "PUT",
    url: "/Royality/updatebyid/:id",
    schema: {
      description: "Royality update",
      summary: "Royality update",
      tags: ["Royality"],
      params: {
        type: "object",
        properties: {
          id: {
            type: "string",
            description: "Royality id",
          },
        },
        required: ["id"],
      },
      response: {
        200: {
          type: "object",
          description: "sucessfully reterived id!",
          properties: {
            message: {
              type: "string",
              description: "sucess",
            },
          },
        },
      },
    },
    handler: RoyalityUpdateOneHandler,
  });

  fastify.route({
    method: "POST",
    url: "/Royality/Reportdtl",
    schema: {
      description: "Royality report detail",
      summary: "royality detail find by filters",
      tags: ["Royality"],
      body: {
        type: "object",
        properties: {
          fromDate: {
            type: "string",
            description: "from date",
            default: new Date(),
          },
          toDate: {
            type: "string",
            description: "to date",
            default: new Date(),
          },
          invoiceId: {
            type: "string",
            description: "invoice object id",
          },
          salesContractId: {
            type: "string",
            description: "salecontract object id",
          },
          payementId: {
            type: "string",
            description: "payment object id",
          },
          customerId: {
            type: "string",
            description: "customer object id",
          },
          page: {
            type: "number",
            default: 0,
          },
          perPage: {
            type: "number",
            default: 0,
          },
        },
      },
      response: {
        200: {
          type: "array",
          description: "sucessfully reterived id!",
          properties: {
            message: {
              type: "string",
              description: "sucess",
            },
          },
        },
      },
    },
    handler: RoyalityReportdtlHandler,
  });

  done();
};

module.exports = routes;
