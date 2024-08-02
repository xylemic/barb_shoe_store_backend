// importing the various he node modules
const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const { sequelize } = require('./models/productModels');

// setting up dotenv for environment variables and loading .env files into process.env
dotenv.config();

// initializing express app
const app = express();

// parsing JSON request bodies
 app.use(bodyParser.json());

 // setting up a route handler
 app.get('/', (req, res) => {
  res.send('Barb Shoe Store');
 });

 // importing the route for products
 const productRoutes = require('./routes/productRoutes');
 app.use('/api/products', productRoutes);

 // starting up the server
 const PORT = process.env.PORT || 3000;
 app.listen(PORT, async () => {
  console.log(`Server running on port ${PORT}`);
  await sequelize.sync();
  console.log('Database connected');
 });
