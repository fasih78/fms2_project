const fastify = require("fastify");
const {
  createProductionHandler,
  ProductionFindoneHandler,
  ProductionFindallHandler,
  ProductiondtlBydateHandler,
  ProductiondeleteoneHandler,
  Productiondeleteall,
  ProductupdatebyidHandler,
} = require("./handler.js");
const { option } = require("../swagger");

const route = async (fastify, option, done) => {
  fastify.route({
    method: "POST",
    url: "/Production",
    schema: {
      description: "production create",
      summary: "production create",
      tags: ["Production"],
      body: {
        type: "object",
        properties: {
          tran: {
            type: "number",
            description: "tran of production",
          },
          date: {
            type: "string",
            format: "date",
            description: "Date in YYYY-MM-DD format",
          },
          productionType: {
            type: "string",
            description: "productionType",
          },
          specialInstruction: {
            type: "string",
            description: "specialInstruction",
          },
          machine: {
            type: "string",
            description: "machine object id",
          },
          customer: {
            type: "string",
            description: " customer object id",
          },
          lot: {
            type: "string",
            description: "lot",
          },
          bales: {
            type: "string",
            description: "bales",
          },
          qty: {
            type: "number",
            description: "qty of product",
          },
          uom: {
            type: "string",
            description: "uom of product",
          },
          product: {
            type: "string",
            description: "product objectid",
          },
          production: {
            type: "string",
            description: "production objectid",
          },
        },
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
    handler: createProductionHandler,
  });

  fastify.route({
    method: "GET",
    url: "/ProductionGetone/:id",
    schema: {
      description: "production get one",
      summary: "production get one",
      tags: ["Production"],
      params: {
        type: "object",
        properties: {
          id: {
            type: "string",
            description: "production find id!",
          },
        },
        required: ["id"],
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
    handler: ProductionFindoneHandler,
  });

  fastify.route({
    method: "GET",
    url: "/ProductionFindAll",
    schema: {
      description: "find production",
      summary: "find production",
      tags: ["Production"],
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
    handler: ProductionFindallHandler,
  });

  fastify.route({
    method: "POST",
    url: "/Productiondtlbydate",
    schema: {
      description: "production detail by date filter and customer",
      summary: "production dtl by filters",
      tags: ["Production"],
      body: {
        type: "object",
        properties: {
          customer_id: {
            type: "string",
            description: "customer id",
          },
          fromDate: {
            type: "string",
            description: "from date",
          },
          toDate: {
            type: "string",
            description: "to Date",
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
    handler: ProductiondtlBydateHandler,
  });

  fastify.route({
    method: "DELETE",
    url: "/Production/deleteone/:id",
    schema: {
      description: "production delete one",
      summary: "production delete one",
      tags: ["Production"],
      params: {
        type: "object",
        properties: {
          id: {
            type: "string",
            description: "production id",
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
    handler: ProductiondeleteoneHandler,
  });

  fastify.route({
    method: "DELETE",
    url: "/Production/deleteall",
    schema: {
      description: "production",
      summary: "production delete all",
      tags: ["Production"],
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
    handler: Productiondeleteall,
  });
  fastify.put('/Production/updatebyid/:id',{
    // method: "PUT",
    // url: "/Producion/updatebyid/:id",
    schema: {
      description: "production update",
      summary: "production update",
      tags: ["Production"],
      params: {
        type: "object",
        properties: {
          id: {
            type: "string",
            description: "production id",
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
    handler: ProductupdatebyidHandler,
  });

  done();
};
module.exports = route;
