const express = require('express');
const employeeRoutes = require('./routes/employeeRoutes');
const logger = require('./middlewares/logger');
const logRoutes = require('./middlewares/logRoutes');
const swaggerSetup = require('./swagger');
const authMiddleware = require('./middlewares/authMiddleware');
require('dotenv').config();

const app = express();

app.use(logger);
app.use(express.json());
app.use('/data', employeeRoutes);

logRoutes(app); // Log all API endpoints and methods on server start

swaggerSetup(app); // Swagger setup

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`\nServer is running on port ${PORT}`);
  console.log(`\nSwagger UI available at http://localhost:3000/api-docs`);
  console.log(`Credentials to access SwaggerUI : \n Username: ${authMiddleware.username}\n Password: ${authMiddleware.password}`);
});
