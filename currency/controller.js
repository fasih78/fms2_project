const {
createCurrencyHandler,
CurrencyFindoneHandler,
CurrencyFindallHandler,
CurrencyDeleteoneHandler,
CurrencyDeleteallHandler,
CurrencyUpdatebyidHandler
}=require ('./handler.js')



const routes = async (fastify, option, done) => {
    fastify.post("/Currency", {
      schema: {
        description: "create currency",
        tags: ["Currency"],
        summary: "Create currency ",
        body: {
          type: "object",
          properties: {
            name: {
              type: "string",
              description: "name of currency",
            },
          },
          required: ["name"],
        },
      },
      response: {
        200: {
          description: "currency Created",
          properties: {
            message: { type: "string" },
          },
        },
      },
      handler: createCurrencyHandler,
    });
  
    fastify.get("/Currency/Getone/:id", {
      schema: {
        tags: ["Currency"],
        description: "Retrieve a currency by its ID",
        summary: "Get one currency",
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
            description: "Successfully retrieved currency",
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
      handler: CurrencyFindoneHandler,
    });
  
    fastify.get("/Currencyfindall", {
      schema: {
        description: "Get all currency",
        tags: ["Currency"],
        summary: "Get all currency",
        response: {
          200: {
            description: "Successfully retrieved currency",
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
  
      handler: CurrencyFindallHandler,
    });
  
    fastify.delete("/Currencydeleteone/:id", {
      schema: {
        tags: ["Currency"],
        description: "Retrieve a Currency by its ID",
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
            description: "Successfully delete currency",
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
      handler: CurrencyDeleteoneHandler,
    });
  
    fastify.delete("/Currency/Deleteall", {
      schema: {
        description: " Delete all currency",
        tags: ["Currency"],
        summary: "Delete all currency",
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
      handler: CurrencyDeleteallHandler,
    });
  
    fastify.put("/CurrencyupdateByid/:id", {
      schema: {
        discription: "currency update",
        summary: "= currency update api",
        tags: ["Currency"],
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
              description: "name of currency",
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
      handler: CurrencyUpdatebyidHandler,
    });
  
    done();
  };
  
  module.exports = routes;
  