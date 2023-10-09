const fastify = require("fastify");
const {
  createInvoiceHandler,
  InvoicefindDtlByDateHandler,
  InvoiceFindall,
  InvoiceGroupByQTY,
  InvoiceDeleteAll,
  InvoiceDelelteOne,
  InvoiceupdateByid,

} = require("./handler");
const moment = require("moment");
const route = async (fastify, option, done) => {
  fastify.route({
    method: "POST",
    url: "/invoice",
    schema: {
      description: "Invoice create",
      summary: "Invoice create",
      tags: ["Invoice"],
      body: {
        type: "object",
        properties: {
          inv: {
            type: "number",
            description: "no of Invoice",
          },
          date: {
            type: "string",
          },
          specialInstuction: {
            type: "string",
            description: "specialInstuction ",
          },
          saleTaxinvoice_no: {
            type: "string",
            description: "saleTaxinvoice_no",
          },
          salesContract: {
            type: "string",
            description: "salesContract object id",
          },

          invoiceDtl: {
            type: "array",
            description: "no of salecontracts",
          },
        },
      },
      response: {
        200: {
          description: "Invoice  Created!",
          type: "object",
          properties: {
            message: { type: "string" },
          },
        },
      },
    },
    handler: createInvoiceHandler,
  });
  fastify.route({
    method: "POST",
    url: "/Invoicedtlbydate",
    schema: {
      description: "find Invoicedtlbydate",
      summary: "find Invoicedtlbydate",
      tags: ["Invoice"],
      body: {
        type: "object",
        properties: {
          fromDate: {
            type: "string",
            default: moment(new Date()).format("YYYY-MM-DD"),
            description: "fromdate of Invoicedtlbydate",
          },
          toDate: {
            type: "string",
            default: moment(new Date()).format("YYYY-MM-DD"),
          },
          invoice: {
            type: "string",
            description: " invoice id",
          },
          customer: {
            type: "string",
            description: " customer id",
          },
          product: {
            type: "string",
            description: " product id",
          },
          salesContract: {
            type: "string",
            description: " salecontract id",
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
    handler: InvoicefindDtlByDateHandler,
  });
  fastify.route({
    method: "GET",
    url: "/invoice/getall",
    schema: {
      summary: "invoice get all",
      description: "get all record",
      tags: ["Invoice"],
      response: {
        200: {
          description: "Successfully retrieved invoice",
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
    handler:InvoiceFindall
  });
  fastify.route({
    method: "GET",
    url: "/invoice/groupby",
    schema: {
      summary: "invoice get all",
      description: "get all record",
      tags: ["Invoice"],
      response: {
        200: {
          description: "Successfully retrieved invoice",
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
    handler:InvoiceGroupByQTY
  });


  fastify.route({
    method: "DELETE",
    url: "/Invoice/deleteone/:id",
    schema: {
      description: "Invoice delete one",
      summary: "Invoice delete one",
      tags: ["Invoice"],
      params: {
        type: "object",
        properties: {
          id: {
            type: "string",
            description: "Invoice id",
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
    handler:InvoiceDelelteOne,
    
  });

  fastify.route({
    method: "DELETE",
    url: "/Invoice/deleteall",
    schema: {
      description: "Invoice",
      summary: "Invoice delete all",
      tags: ["Invoice"],
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
    handler: InvoiceDeleteAll,
  });
  fastify.route({
     method: "PUT",
     url: "/Invoice/updatebyid/:id",
    schema: {
      description: "Invoice update",
      summary: "Invoice update",
      tags: ["Invoice"],
      params: {
        type: "object",
        properties: {
          id: {
            type: "string",
            description: "Invoice id",
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
    handler: InvoiceupdateByid,
  });




  done();
};

module.exports = route;
