const express = require('express');
const swaggerUi = require('swagger-ui-express');
const path = require('path');
const employeeRoutes = require('./routes/employeeRoutes');
const logger = require('./middlewares/logger');
const logRoutes = require('./middlewares/logRoutes');

const app = express();

app.use(logger);
app.use(express.json());
app.use('/data', employeeRoutes);

// Log all API endpoints and methods on server start
logRoutes(app);

// Serve Swagger JSON
app.use('/swagger-output.json', express.static(path.join(__dirname, 'swagger-output.json')));

// Serve Swagger UI
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(require('./swagger-output.json')));


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
