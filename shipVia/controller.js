const {
    createShipviaHandler,
    ShipviaFindoneHandler,
    ShipviaFindallHandler,
    ShipviaDeleteoneHandler,
    ShipviaDeleteallHandler,
    ShipviaUpdatebyidHandler,
}=require ('./handler.js');



const routes = async (fastify, option, done) => {
    fastify.post("/Shipvia", {
      schema: {
        description: "create Shipvia",
        tags: ["Shipvia"],
        summary: "Create Shipvia ",
        body: {
          type: "object",
          properties: {
            name: {
              type: "string",
              description: "name of Shipvia",
            },
          },
          required: ["name"],
        },
      },
      response: {
        200: {
          description: "Shipvia Created",
          properties: {
            message: { type: "string" },
          },
        },
      },
      handler: createShipviaHandler,
    });
  
    fastify.get("/Shipvia/Getone/:id", {
      schema: {
        tags: ["Shipvia"],
        description: "Retrieve a Shipvia by its ID",
        summary: "Get one Shipvia",
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
            description: "Successfully retrieved Shipvia",
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
      handler: ShipviaFindoneHandler,
    });
  
    fastify.get("/Shipviafindall", {
      schema: {
        description: "Get all Shipvia",
        tags: ["Shipvia"],
        summary: "Get all Shipvia",
        response: {
          200: {
            description: "Successfully retrieved Shipvia",
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
  
      handler: ShipviaFindallHandler,
    });
  
    fastify.delete("/Shipviadeleteone/:id", {
      schema: {
        tags: ["Shipvia"],
        description: "Retrieve a Shipvia by its ID",
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
            description: "Successfully delete Shipvia",
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
      handler: ShipviaDeleteoneHandler,
    });
  
    fastify.delete("/Shipvia/Deleteall", {
      schema: {
        description: " Delete all Shipvia",
        tags: ["Shipvia"],
        summary: "Delete all Shipvia",
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
      handler: ShipviaDeleteallHandler,
    });
  
    fastify.put("/ShipviaupdateByid/:id", {
      schema: {
        discription: "Shipvia update",
        summary: "Shipvia update api",
        tags: ["Shipvia"],
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
              description: "name of Shipvia",
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
      handler: ShipviaUpdatebyidHandler,
    });
  
    done();
  };
  
  module.exports = routes;
  