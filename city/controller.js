const fastify = require("fastify")({ logger: true });
const { option } = require("../swagger.js");
const {
  createCityHandler,
  cityFindoneHandler,
  cityFindallHandler,
  cityDeleteoneHandler,
  cityDeleteallHandler,
  cityUpdatebyidHandler,
} = require("./handler.js");

const routes = async (fastify, option, done) => {
  fastify.post("/City", {
    schema: {
      description: "create city",
      tags: ["City"],
      summary: "Create city ",
      body: {
        type: "object",
        properties: {
          name: {
            type: "string",
            description: "name of city",
          },
        },
        required: ["name"],
      },
    },
    response: {
      200: {
        description: "city Created",
        properties: {
          message: { type: "string" },
        },
      },
    },
    handler: createCityHandler,
  });

  fastify.get("/City/Getone/:id", {
    schema: {
      tags: ["City"],
      description: "Retrieve a city by its 0c",
      summary: "Get one city",
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
          description: "Successfully retrieved city",
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
    handler: cityFindoneHandler,
  });

  fastify.get("/Cityfindall", {
    schema: {
      description: "Get all cities",
      tags: ["City"],
      summary: "Get all cities",
      response: {
        200: {
          description: "Successfully retrieved cities",
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

    handler: cityFindallHandler,
  });

  fastify.delete("/Citydeleteone/:id", {
    schema: {
      tags: ["City"],
      description: "Retrieve a City by its ID",
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
    handler: cityDeleteoneHandler,
  });

  fastify.delete("/City/Deleteall", {
    schema: {
      description: " Delete all cities",
      tags: ["City"],
      summary: "Delete all cities",
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
    handler: cityDeleteallHandler,
  });

  fastify.put("/CityupdateByid/:id", {
    schema: {
      discription: "city update",
      summary: "city update api",
      tags: ["City"],
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
            description: "name of city",
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
    handler: cityUpdatebyidHandler,
  });

  done();
};

module.exports = routes;
