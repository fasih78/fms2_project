const fastify = require("fastify")({ logger: true });
const { option } = require("../swagger.js");

const {
  createStateHandler,
  StateFindoneHandler,
  StateFindallHandler,
  StateDeleteoneHandler,
  StateDeleteallHandler,
  StateUpdatebyidHandler,
} = require("./handler.js");

const routes = async (fastify, option, done) => {
  fastify.post("/State", {
    schema: {
      description: "create state",
      tags: ["State"],
      summary: "Create state",
      body: {
        type: "object",
        properties: {
          name: {
            type: "string",
            description: "name of state",
          },
        },
        required: ["name"],
      },
    },
    response: {
      200: {
        description: "state Created",
        properties: {
          message: { type: "string" },
        },
      },
    },
    handler: createStateHandler,
  });

  fastify.get("/State/Getone/:id", {
    schema: {
      tags: ["State"],
      description: "Retrieve a state by its ID",
      summary: "Get one state",
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
          description: "Successfully retrieved state",
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
    handler: StateFindoneHandler,
  });

  fastify.get("/Statefindall", {
    schema: {
      description: "Get all states",
      tags: ["State"],
      summary: "Get all states",
      response: {
        200: {
          description: "Successfully retrieved state",
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

    handler: StateFindallHandler,
  });

  fastify.delete("/Statedeleteone/:id", {
    schema: {
      tags: ["State"],
      description: "Retrieve a state by its ID",
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
          description: "Successfully delete state",
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
    handler: StateDeleteoneHandler,
  });

  fastify.delete("/State/Deleteall", {
    schema: {
      description: " Delete all state",
      tags: ["State"],
      summary: "Delete all state",
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
    handler: StateDeleteallHandler,
  });

  fastify.put("/StateupdateByid/:id", {
    schema: {
      discription: "state update",
      summary: "state update api",
      tags: ["State"],
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
    handler: StateUpdatebyidHandler,
  });

  done();
};
module.exports = routes;
