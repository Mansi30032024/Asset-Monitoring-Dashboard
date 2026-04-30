const express = require('express');
const app = express();
require('dotenv').config();
require('./db');
const bodyParser = require('body-parser');
const cors = require('cors');

app.use(bodyParser.json());
const allowedOrigins = (process.env.CLIENT_URL || '')
  .split(',')
  .map((origin) => origin.trim().replace(/\/$/, ''))
  .filter(Boolean);

app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.length === 0 || allowedOrigins.includes(origin.replace(/\/$/, ''))) {
      return callback(null, true);
    }

    return callback(new Error('Not allowed by CORS'));
  }
}));

const PORT = process.env.PORT || 5000;

app.get('/', (req, res) => {
  res.send('Welcome to Asset Monitoring Dashboard');
});

//routes
const userRoutes = require('./routes/userRoutes');
const assetRoutes = require('./routes/assetRoutes');

app.use('/user', userRoutes);
app.use('/asset', assetRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});
