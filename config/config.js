require('dotenv').config();

module.exports = {
  development: {
    storage: process.env.DATABASE_STORAGE,
    dialect: 'sqlite',
  },
  production: {
    storage: process.env.DATABASE_STORAGE,
    dialect: 'sqlite',
  }
};
