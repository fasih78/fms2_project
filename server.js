const fastify = require("fastify")({ logger: true });
const dbconnect = require("./db.js");
const cors = require("@fastify/cors");
//const jwt = require("jsonwebtoken");
require("dotenv").config();
const json = require("json");
const fastifySwaggerUi = require("@fastify/swagger-ui");

const { option, fastifyUI } = require("./swagger.js");
const { request } = require("express");
fastify.register(cors);

// fastify.register(jwt, {
//   secret: process.env.JWT_SECRET_KEY,
// });
fastify.register(require("@fastify/swagger"), option);

fastify.register(fastifySwaggerUi, fastifyUI);

fastify.register(require("./user/userController.js"));
fastify.register(require("./city/controller.js"));
fastify.register(require("./state/controller.js"));
fastify.register(require("./country/controller.js"));
fastify.register(require("./brand/controller.js"));
fastify.register(require("./currency/controller.js"));
fastify.register(require("./customer/controller.js"));
fastify.register(require("./product/controller.js"));
fastify.register(require("./machine/controller.js"));
fastify.register(require("./payment_term/controller.js"));
fastify.register(require("./Production/controller.js"));
fastify.register(require("./shipVia/controller"));
fastify.register(require("./salescontract/controller.js"));
fastify.register(require("./shipment/controller"));
fastify.register(require("./invoice/controller.js"));
fastify.register(require("./payment/controller"))
fastify.register(require("./royality/controller.js"))

const server = fastify.listen(
  { port: process.env.NODE_PORT },
  async (error, address) => {
    if (error) {
      fastify.log.error(error);
    } else {
      fastify.log.info(`Server listening on ${address}`);
      fastify.swagger();
      await dbconnect();
    }
  }
);

function disconnectFromDb() {
  return mongoose.connection.close();
}
// Handle unhandled promise rejections
process.on("unhandledRejection", (reason, promise) => {
  console.error("Unhandled Rejection at:", promise, "reason:", reason);
  // You can add additional error handling or graceful shutdown logic here
});

process.on("SIGINT", () => {
  console.log("Shutting down gracefully...");
  server.close(async () => {
    console.log("Server has closed.");
    await disconnectFromDb();
    process.exit(0);
  });
});

module.exports = server;
