const {
  createPayment_termHandler,
  Payment_termFindoneHandler,
  Payment_termFindallHandler,
  Payment_termDeleteoneHandler,
  Payment_termDeleteallHandler,
  Payment_termUpdatebyidHandler,
} = require("./handler.js");

const routes = async (fastify, option, done) => {
  fastify.route({
    method: "POST",
    url: "/Payment_term",
    schema: {
      description: "create Payment_term",
      tags: ["Payment_term"],
      summary: "Create Payment_term ",
      body: {
        type: "object",
        properties: {
          name: {
            type: "string",
            description: "name of Payment_term",
          },
        },
        required: ["name"],
      },
    },
    response: {
      200: {
        description: "Payment_term Created",
        properties: {
          message: { type: "string" },
        },
      },
    },
    handler: createPayment_termHandler,
  });

  fastify.route({
    method: "GET",
    url: "/Payment_term/Getone/:id",
    schema: {
      tags: ["Payment_term"],
      description: "Retrieve a Payment_term by its ID",
      summary: "Get one Payment_term",
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
          description: "Successfully retrieved Payment_term",
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
    handler: Payment_termFindoneHandler,
  });

  fastify.route({
    method: "GET",
    url: "/Payment_term/Getall",
    schema: {
      description: "Get all Payment_term",
      tags: ["Payment_term"],
      summary: "Get all Payment_term",
      response: {
        200: {
          description: "Successfully retrieved Payment_term",
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

    handler: Payment_termFindallHandler,
  });

  fastify.route({
    method: "DELETE",
    url: "/Payment_term/deleteone/:id",
    schema: {
      tags: ["Payment_term"],
      description: "Retrieve a Payment_term by its ID",
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
          description: "Successfully delete Payment_term",
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
    handler: Payment_termDeleteoneHandler,
  });

  fastify.route({
    method: "DELETE",
    url: "/Payment_term/Deleteall",
    schema: {
      description: " Delete all Payment_term",
      tags: ["Payment_term"],
      summary: "Delete all Payment_term",
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
    handler: Payment_termDeleteallHandler,
  });

  fastify.route({
    method: "PUT",
    url: "/Payment_term/updateByid/:id",
    schema: {
      discription: "Payment_term update",
      summary: "= Payment_term update api",
      tags: ["Payment_term"],
      params: {
        type: "object",
        properties: {
          id: {
            type: "string",
            description: "id required",
          },
        },
      },
      body: {
        type: "object",
        properties: {
          name: {
            type: "string",
            description: "name of Payment_term",
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
    handler: Payment_termUpdatebyidHandler,
  });

  done();
};

module.exports = routes;
