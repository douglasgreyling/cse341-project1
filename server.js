require('dotenv').config()

const app = require('./app');
const connectDB = require('./config/database');

const PORT = process.env.PORT || 3000;

connectDB();

app.listen(PORT, () => {
  console.log('');
  console.log(`Server is running on port ${PORT}`);
  console.log('');
  console.log(`Health check: http://localhost:${PORT}/health`);
  console.log('');
  console.log('API endpoints:');
  console.log('  GET    /api/contacts     - Fetch all contacts');
  console.log('  GET    /api/contacts/:id - Fetch contact');
  console.log('  POST   /api/contacts     - Create new contact');
  console.log('  PUT    /api/contacts/:id - Update contact');
  console.log('  DELETE /api/contacts/:id - Delete contact');
  console.log('');
  console.log('Swagger UI: http://localhost:3000/api-docs');
  console.log('');
});