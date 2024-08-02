const { Sequelize, DataTypes } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(process.env.DATABASE_STORAGE);

const Product = sequelize.define('Product', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  price: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  stock: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  colors: {
    type: DataTypes.JSON,
    allowNull: false,
  },
  hidden: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  image: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  timestamps: true
})

module.exports = { Product, sequelize };
