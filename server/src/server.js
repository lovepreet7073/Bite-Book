const app = require('.');
const connectDB = require('./Config/db'); 

const PORT = 5454;
const startServer = async () => {
  await connectDB(); 
  app.listen(PORT, () => {
    console.log('API listening on port:', PORT);
  });
};

startServer();
