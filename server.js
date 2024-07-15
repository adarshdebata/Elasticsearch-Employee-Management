const express = require('express');
const employeeRoutes = require('./routes/employeeRoutes');
const logger = require('./middlewares/logger');
const logRoutes = require('./middlewares/logRoutes');

const app = express();

app.use(logger);

app.use(express.json());
app.use('/data', employeeRoutes);

// Log all API endpoints and methods on server start
logRoutes(app);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
