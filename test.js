const express = require('express');
const app = express();

app.use(express.json()); // built-in JSON parser

app.post('/test', (req, res) => {
  console.log('Request Body:', req.body);
  res.json({ received: req.body });
});

app.listen(3000, () => {
  console.log('Server running on port 3000');
});
