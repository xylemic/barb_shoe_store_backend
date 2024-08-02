const express = require('express');
const router = express.Router();
const { Product } = require('../models/productModels');

// get all products
router.get('/', async (req, res) => {
  try {
    const products = await Product.findAll();
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// create a new product 
router.post('/', async (req, res) => {
  const { name, price, stock, colors, hidden, image } = req.body;
  console.log('request body:', req.body);
  if (!name || !price || !stock || !image || !colors) {
    return res.status(400).json({ error: 'all fields are required' });
  }
  try {
    const product = await Product.create({ name, price, stock, colors, hidden, image });
    res.json(product);
  } catch (error) {
    console.log('error creating product:', error);
    res.status(500).json({ error: error.message });
  }
});

// filter and search products
router.get('/search', async (req, res) => {
  const { name, minPrice, maxPrice, color } = req.query;
  const whereClause = {};

  if (name) {
    whereClause.name = { [Op.like]: `%${name}%` };
  }
  if (minPrice) {
    whereClause.price = { [Op.gte]: parseFloat(minPrice) };
  }
  if (maxPrice) {
    whereClause.price = {...whereClause.price, [Op.lte]: parseFloat(maxPrice) };
  }
  if (color) {
    whereClause.colors = { [Op.contains]: [color] };
  }

  try {
    const products = await Product.findAll({ where: whereClause });
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// update a product
router.put('/:id', async (req, res) => {
  try {
    const product = await Product.findByPk(req.params.id);
    if (product) {
      await product.update(req.body);
      res.json(product);
    } else {
      res.status(404).json({ error: 'product not found' });
    }
  } catch (error) {
    console.log('error updating product:', error);
    res.status(500).json({ error: error.message });
  }
});

// delete a product
router.delete('/:id', async (req, res) => {
  try {
    const product = await Product.findByPk(req.params.id);
    if (product) {
      await product.destroy();
      res.json({ message: 'product deleted successfully' });
    } else {
      res.status(404).json({ error: 'product not found' });
    }
  } catch (error) {
    console.log('error deleting product:', error);
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
