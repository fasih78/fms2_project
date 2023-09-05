const { CountryFindoneHandler } = require("../country/handler");
const {
  createBrandHandler,
  BrandFindoneHandler,
  BrandFindallHandler,
  BrandDeleteoneHandler,
  BrandDeleteallHandler,
  BrandUpdatebyidHandler,
} = require("./handler.js");

const routes = async (fastify, option, done) => {
  fastify.post("/Brand", {
    schema: {
      description: "create brand",
      tags: ["Brand"],
      summary: "Create brand ",
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
        description: "Brand Created",
        properties: {
          message: { type: "string" },
        },
      },
    },
    handler: createBrandHandler,
  });

  fastify.get("/Brand/Getone/:id", {
    schema: {
      tags: ["Brand"],
      description: "Retrieve a brand by its ID",
      summary: "Get one brand",
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
          description: "Successfully retrieved brand",
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

  fastify.get("/Brandfindall", {
    schema: {
      description: "Get all brand",
      tags: ["Brand"],
      summary: "Get all brand",
      response: {
        200: {
          description: "Successfully retrieved brand",
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

    handler: BrandFindallHandler,
  });

  fastify.delete("/Branddeleteone/:id", {
    schema: {
      tags: ["Brand"],
      description: "Retrieve a brand by its ID",
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
          description: "Successfully delete brand",
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
    handler: BrandDeleteoneHandler,
  });

  fastify.delete("/Brand/Deleteall", {
    schema: {
      description: " Delete all brand",
      tags: ["Brand"],
      summary: "Delete all brand",
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
    handler: BrandDeleteallHandler,
  });

  fastify.put("/BrandupdateByid/:id", {
    schema: {
      discription: "brand update",
      summary: "brand update api",
      tags: ["Brand"],
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
            description: "name of brand",
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
    handler: BrandUpdatebyidHandler,
  });

  done();
};
module.exports = routes;
