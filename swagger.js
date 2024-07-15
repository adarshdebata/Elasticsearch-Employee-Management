const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'Employee API',
    description: 'Employee Management API'
  },
  host: 'localhost:3000',
  basePath: '/data',  // Set the base path for your routes
  schemes: ['http'],
  tags: [
    {
      name: "Employees",
      description: "Endpoints related to Employee operations"
    }
  ]
};

const outputFile = './swagger-output.json';
const endpointsFiles = ['./routes/employeeRoutes.js'];

swaggerAutogen(outputFile, endpointsFiles, doc).then(() => {
    console.log('Swagger JSON generated successfully!');
    // require('./server');  // Your project's root file
    process.exit();
});
