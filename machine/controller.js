const {
  createMachineHandler,
  MachineFindoneHandler,
  MachineFindallHandler,
  MachineDeleteoneHandler,
  MachineDeleteallHandler,
  MachineUpdatebyidHandler,
} = require("./handler.js");

const routes = async (fastify, option, done) => {
  fastify.route({
    method: "POST",
    url: "/Machine",
    schema: {
      description: "create machine",
      tags: ["Machine"],
      summary: "Create Machine",
      body: {
        type: "object",
        properties: {
          name: {
            type: "string",
            description: "name of customer",
          },
        },
        required: ["name"],
      },
      response: {
        200: {
          description: "Machine Created!",
          type: "object",
          properties: {
            message: { type: "string" },
          },
        },
      },
    },
    handler: createMachineHandler,
  });
  fastify.route({
    method: "GET",
    url: "/Machinegetone/:id",
    schema: {
      description: "machine get one",
      summary: "get one",
      tags: ["Machine"],
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
          description: "Successfully retrieved Machine",
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
    handler: MachineFindoneHandler,
  });

  fastify.route({
    method: "GET",
    url: "/Machinegetall",
    schema: {
      description: "machine get all",
      tags: ["Machine"],
      summary: " Machine get all",
      response: {
        200: {
          description: "Successfully retrieved machine",
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
    handler: MachineFindallHandler,
  });

  fastify.route({
    method: "DELETE",
    url: "/MachineDeleteone/:id",
    schema: {
      description: "machine delete one",
      tags: ["Machine"],
      summary: "machine delete one",
      params: {
        type: "object",
        properties: {
          id: {
            type: "string",
            description: "machine id",
          },
        },
        required: ["id"],
      },
      response: {
        200: {
          description: "Successfully delete machine",
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
    handler: MachineDeleteoneHandler,
  });
  fastify.route({
    method: "DELETE",
    url: "/MachineDeleteall",
    schema: {
      description: "machine delete all",
      tags: ["Machine"],
      summary: " Machine delete all",
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
    handler: MachineDeleteallHandler,
  });

  fastify.route({
    method: "PUT",
    url: "/MachineupdateById/:id",
    schema: {
      description: " machine update by id",
      tags: ["Machine"],
      summary: " Machine update",
      params: {
        type: "object",
        properties: {
          id: {
            type: "string",
            description: "machine id",
          },
        },
        required: ["id"],
      },
      body: {
        type: "object",
        properties: {
          name: {
            type: "string",
            description: "name of machine",
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
    handler: MachineUpdatebyidHandler,
  });
  done();
};

module.exports = routes;
