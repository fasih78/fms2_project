const fastify = require("fastify")({ logger: true });
require("dotenv").config();
//const items = require("./items");
const cors = require ('@fastify/cors');
require('./server')




