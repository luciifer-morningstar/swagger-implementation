export const swaggerDefinition = {
    openapi: '3.0.0',
    info: {
      title: 'Swagger API',
      version: '1.0.0',
      description: 'This is a REST API application made with Express..'
    },
    servers: [
      {
        url: 'http://localhost:3000',
        description: 'Development server',
      }
    ],
    // -------------------------------JWT Authentication------------------------
    // components: {
    //     securitySchemes: {
    //         bearerAuth: {
    //             type: 'http',
    //             scheme: 'bearer',
    //             bearerFormat: 'JWT',
    //         }
    //     }
    // },
  };
export const swaggerOptions = {
    swaggerDefinition,
    apis: [`${__dirname}/routes/*.js`],
  };
