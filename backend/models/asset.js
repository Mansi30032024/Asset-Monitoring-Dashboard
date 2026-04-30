const mongoose = require('mongoose');

const assetSchema = new mongoose.Schema(
  {
    assetName: {
      type: String,
      required: true
    },
    assetType: {
      type: String,
      required: true
    },
    location: {
      type: String,
      required: true
    },
    status: {
      type: String,
      enum: ['active', 'inactive', 'maintenance'],
      default: 'active'
    },
    temperature: {
      type: Number,
      default: 0
    },
    pressure: {
      type: Number,
      default: 0
    },
    lastServiceDate: {
      type: Date
    }
  },
  { timestamps: true }
);

const Asset = mongoose.model('Asset', assetSchema);

module.exports = Asset;

//asset