import express from "express";
import helmet from "helmet";
import xss from "xss-clean";
import cors from "cors";
import httpStatus from "http-status";
import _ from "lodash";

import routes from "./routes";
import { swaggerOptions } from "./swagger";

export const app = express();
const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerJSDoc(swaggerOptions)));
app.use(cors());
app.options("*", cors());
// set security HTTP headers
app.use(helmet());

// parse json request body
app.use(express.json({ limit: "50mb" }));
// app.use(multer.array());
// parse urlencoded request body
app.use(express.urlencoded({ extended: true, limit: "50mb" }));

// sanitize request data
app.use(xss());

app.set("view engine", "ejs");

app.set("views", __dirname);

// api routes
app.use('/api', routes);

// Health check

app.get("/", (req, res) => {
  return res.status(200).send("healthy");
});

// send back a 404 error for any unknown api request
app.use((req, res) => {
  return res.sendStatus(httpStatus.NOT_IMPLEMENTED);
});

app.use((req, res, next) => {
  if (!req.locals) req.locals = {};
  next();
});
