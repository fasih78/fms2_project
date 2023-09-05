const {
  createProductHandler,
  ProductFindoneHandler,
  ProductFindallHandler,
  ProductDeleteoneHandler,
  ProductDeleteallHandler,
  ProductUpdatebyidHandler,
} = require("./handler.js");

const routes = async (fastify, option, done) => {
  fastify.route({
    method: "POST",
    url: "/Product",
    schema: {
      description: "create product",
      tags: ["Product"],
      summary: "Create Product",
      body: {
        type: "object",
        properties: {
          name: {
            type: "string",
            description: "name of product",
          },
          price: {
            type: "string",
            description: "price",
          },
          currency: {
            type: "string",
            description: "currency id",
          },
        },
        required: ["name"],
        required: ["currency"],
      },
      response: {
        200: {
          description: "Product Created!",
          type: "object",
          properties: {
            message: { type: "string" },
          },
        },
      },
    },
    handler: createProductHandler,
  });
  fastify.route({
    method: "GET",
    url: "/Productgetone/:id",
    schema: {
      description: "product get one",
      summary: "get one",
      tags: ["Product"],
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
          description: "Successfully retrieved Product",
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
    handler: ProductFindoneHandler,
  });

  fastify.route({
    method: "GET",
    url: "/Productgetall",
    schema: {
      description: "product get all",
      tags: ["Product"],
      summary: " Product get all",
      response: {
        200: {
          description: "Successfully retrieved product",
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
    handler: ProductFindallHandler,
  });

  fastify.route({
    method: "DELETE",
    url: "/ProductDeleteone/:id",
    schema: {
      description: "product delete one",
      tags: ["Product"],
      summary: "product delete one",
      params: {
        type: "object",
        properties: {
          id: {
            type: "string",
            description: "product id",
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
    handler: ProductDeleteoneHandler,
  });
  fastify.route({
    method: "DELETE",
    url: "/ProductDeleteall",
    schema: {
      description: "product delete all",
      tags: ["Product"],
      summary: " Product delete all",
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
    handler: ProductDeleteallHandler,
  });

  fastify.route({
    method: "PUT",
    url: "/ProductupdateById/:id",
    schema: {
      description: " product update by id",
      tags: ["Product"],
      summary: " Product update",
      params: {
        type: "object",
        properties: {
          id: {
            type: "string",
            description: "product id",
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
          currency: {
            type: "string",
            description: "currency id",
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
    handler: ProductUpdatebyidHandler,
  });
  done();
};

module.exports = routes;
