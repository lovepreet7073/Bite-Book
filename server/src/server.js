// File: server.js
const app = require('.');
const connectDB = require('./Config/db');  // No curly braces needed

const PORT = 5454;

const startServer = async () => {
  await connectDB(); 
  app.listen(PORT, () => {
    console.log('API listening on port:', PORT);
  });
};

startServer();
