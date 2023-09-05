const fastify = require("fastify");
const {
  createSalesContract,
  SaleContractfindoneByidHandler,
  SaleContractFindallHandler,
  findSalesContractDtlsByDate,
} = require("./handler.js");

const route = async (fastify, option, done) => {
  fastify.route({
    method: "POST",
    url: "/SalesContract",
    schema: {
      description: "SalesContract create",
      summary: "SalesContract create",
      tags: ["SalesContract"],
      body: {
        type: "object",
        properties: {
          tran: {
            type: "number",
            description: "tran of SalesContract",
          },
          po: {
            type: "string",
          },
          contract: {
            type: "string",
            description: "contract no",
          },
          specialInstruction: {
            type: "string",
            description: "specialInstruction",
          },
          customer: {
            type: "string",
            description: "customer object id",
          },
          brand: {
            type: "string",
            description: " brand object id",
          },
          paymentterm: {
            type: "string",
            description: "paymentterm object id",
          },
          shipvia: {
            type: "string",
            description: "bales",
          },
          salesContractDtl: {
            type: "array",
            description: "no of salecontracts",
          },
          poDate: {
            type: "string",
            description: "PO date",
          },
          contractDate: {
            type: "string",
            description: "contractDate ",
          },
          tc_no: {
            type: "string",
            description: "tc_no ",
          },
          vendorgarment: {
            type: "string",
            description: "vendorgarment ",
          },
        },
      },
      response: {
        200: {
          description: "saleContract  Created!",
          type: "object",
          properties: {
            message: { type: "string" },
          },
        },
      },
    },
    handler: createSalesContract,
  });

  fastify.route({
    method: "GET",
    url: "/SaleContractGetone/:id",
    schema: {
      description: "SaleContract get one",
      summary: "SaleContract get one",
      tags: ["SaleContract"],
      params: {
        type: "object",
        properties: {
          id: {
            type: "string",
            description: "SaleContract find id!",
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
    handler: SaleContractfindoneByidHandler,
  });

  fastify.route({
    method: "GET",
    url: "/SalecontractFindAll",
    schema: {
      description: "find salecontract",
      summary: "find salecontract",
      tags: ["SaleContract"],
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
    handler: SaleContractFindallHandler,
  });
  fastify.route({
    method: "POST",
    url: "/Salecontractdtlbydate",
    schema: {
      description: "find salecontract",
      summary: "find salecontract",
      tags: ["SaleContract"],
      body: {
        type: "object",
        properties: {
          fromDate: {
            type: "string",
            description: "fromdate of SalesContract",
          },
          toDate: {
            type: "string",
          },
          customer_id: {
            type: "string",
            description: "customer id",
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
    handler: findSalesContractDtlsByDate,
  });
  done();
};

module.exports = route;
