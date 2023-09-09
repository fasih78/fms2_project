const {
  createShipmentHandler,
  ShipmentfindoneByidHandler,
  ShipmentdtlfindallHandler,
  ShipmentdtlsfindByDateHandler,
  ShipmentdeleteOneHandler,
  ShipmentDeleteallHandler,
  ShipmentupdatebyidHandler,
} = require("./handler.js");
const { schema } = require("./shipmentdtlSchema.js");

const route = async (fastify, option, done) => {
  fastify.route({
    method: "POST",
    url: "/Shipment",
    schema: {
      description: "Shipment create",
      summary: "Shipment create",
      tags: ["Shipment"],
      body: {
        type: "object",
        properties: {
          shipmentNumber: {
            type: "number",
            description: "tran of shipmentNumber",
          },
          gpNumber: {
            type: "number",
          },
          gpDate: {
            type: "string",
            description: "gpDate ",
          },
          dcNumber: {
            type: "number",
            description: "dcNumber",
          },
          dcDate: {
            type: "string",
            description: "dcDate ",
          },
          salesContract: {
            type: "string",
            description: "salesContract object id ",
          },
          ShipmentDtl: {
            type: "string",
            description: "ShipmentDtl ",
          },
          specialInstruction: {
            type: "string",
            description: "specialInstruction",
          },
          ShipmentDtl: {
            type: "array",
            description: "no of salecontracts",
          },
          shippedQty: {
            type: "number",
            description: " shippedQty",
          },
        },
      },
      response: {
        200: {
          description: "shipment  Created!",
          type: "object",
          properties: {
            message: { type: "string" },
          },
        },
      },
    },
    handler: createShipmentHandler,
  });

  fastify.route({
    method: "GET",
    url: "/Shipment/findone/:id",
    schema: {
      description: "shipment find one",
      tags: ["Shipment"],
      summary: "shipment find one",
      params: {
        type: "object",
        properties: {
          id: {
            type: "string",
            description: "Shipment find id!",
          },
        },
        required: ["id"],
      },
      response: {
        200: {
          type: "array",
          properties: {
            message: {
              type: "string",
              description: "message",
            },
          },
        },
      },
    },
    handler: ShipmentfindoneByidHandler,
  });
  fastify.route({
    method: "GET",
    url: "/Shipment/findall",
    schema: {
      description: "shipment findall",
      summary: "shipment findall",
      tags: ["Shipment"],
      response: {
        200: {
          type: "array",
          properties: {
            message: {
              type: "string",
              description: "sucess",
            },
          },
        },
      },
    },
    handler: ShipmentdtlfindallHandler,
  });
  fastify.route({
    method: "POST",
    url: "/Shipment/findbydate",
    schema: {
      tags: ["Shipment"],
      summary: "shipment find b date",
      description: "shipment find by date",
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
          salecontract_id: {
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
    handler: ShipmentdtlsfindByDateHandler,
  }),
    fastify.route({
      method: "DELETE",
      url: "/Shipment/deleteone/:id",
      schema: {
        description: "shipment delete one",
        summary: "delete one",
        tags: ["Shipment"],
        params: {
          type: "object",
          properties: {
            id: {
              type: "string",
              description: "shipment delete one",
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
      handler: ShipmentdeleteOneHandler,
    });
  fastify.route({
    method: "DELETE",
    url: "/Shipment/deleteall",
    schema: {
      description: "Shipment",
      summary: "Shipment delete all",
      tags: ["Shipment"],
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
    handler: ShipmentDeleteallHandler,
  });
  fastify.route({
    method: "PUT",
    url: "/Shipment/updatebyid/:id",
    schema: {
      description: "Shipment update",
      summary: "Shipment update",
      tags: ["Shipment"],
      params: {
        type: "object",
        properties: {
          id: {
            type: "string",
            description: "Shipment id",
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
    handler: ShipmentupdatebyidHandler,
  });

  done();
};

module.exports = route;
