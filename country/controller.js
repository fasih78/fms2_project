const {
  createCountryHandler,
  CountryFindoneHandler,
  CountryFindallHandler,
  CountryDeleteoneHandler,
  CountryDeleteallHandler,
  CountryUpdatebyidHandler,
} = require("./handler.js");

const routes = async (fastify, option, done) => {
  fastify.post("/Country", {
    schema: {
      description: "create country",
      tags: ["Country"],
      summary: "Create country ",
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
        description: "country Created",
        properties: {
          message: { type: "string" },
        },
      },
    },
    handler: createCountryHandler,
  });

  fastify.get("/Country/Getone/:id", {
    schema: {
      tags: ["Country"],
      description: "Retrieve a country by its ID",
      summary: "Get one country",
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
          description: "Successfully retrieved country",
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
    handler: CountryFindoneHandler,
  });

  fastify.get("/Countryfindall", {
    schema: {
      description: "Get all country",
      tags: ["Country"],
      summary: "Get all country",
      response: {
        200: {
          description: "Successfully retrieved country",
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

    handler: CountryFindallHandler,
  });

  fastify.delete("/Countrydeleteone/:id", {
    schema: {
      tags: ["Country"],
      description: "Retrieve a country by its ID",
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
          description: "Successfully delete country",
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
    handler: CountryDeleteoneHandler,
  });

  fastify.delete("/Country/Deleteall", {
    schema: {
      description: " Delete all country",
      tags: ["City"],
      summary: "Delete all country",
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
    handler: CountryDeleteallHandler,
  });

  fastify.put("/CountryupdateByid/:id", {
    schema: {
      discription: "country update",
      summary: "country update api",
      tags: ["Country"],
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
    handler: CountryUpdatebyidHandler,
  });

  done();
};

module.exports = routes;
