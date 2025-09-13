const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'Contact API',
    description: 'API for managing contacts'
  },
  host: 'localhost:3000',
  basePath: '/api',
};

const outputFile = './swagger.json';
const routes = ['./routes/contactRoutes'];

swaggerAutogen(outputFile, routes, doc);
