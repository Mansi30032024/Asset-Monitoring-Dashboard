const express = require('express');
const app = express();
require('dotenv').config();
require('./db');
const bodyParser = require('body-parser');
const cors = require('cors');

app.use(bodyParser.json());
const allowedOrigin = process.env.CLIENT_URL;

app.use(cors({
  origin: allowedOrigin || '*'
}));

const PORT = process.env.PORT || 5000;

app.get('/', (req, res) => {
  res.send('Welcome to Asset Monitoring Dashboard');
});

const userRoutes = require('./routes/userRoutes');
const assetRoutes = require('./routes/assetRoutes');

app.use('/user', userRoutes);
app.use('/asset', assetRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});
