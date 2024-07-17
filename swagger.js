const swaggerJSDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
const packageInfo = require("./package.json");
const authMiddleware = require("./middlewares/authMiddleware");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: packageInfo.name,
      version: packageInfo.version,
      description: packageInfo.description,
    },
    servers: [
      {
        url: "http://localhost:3000", // Change this to your server URL
      },
    ],
  },
  apis: ["./routes/*.js", "./controllers/*.js"], // Paths to files containing OpenAPI definitions
};

const swaggerSpec = swaggerJSDoc(options);

module.exports = (app) => {
  app.use(
    "/api-docs",
    authMiddleware,
    swaggerUi.serve,
    swaggerUi.setup(swaggerSpec)
  );
  app.get("/api-docs.json", (req, res) => {
    res.setHeader("Content-Type", "application/json");
    res.send(swaggerSpec);
  });
};
