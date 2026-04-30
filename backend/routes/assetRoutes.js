const express = require('express');
const router = express.Router();
const Asset = require('./../models/asset');
const User = require('./../models/user');
const { jwtAuthMiddleware } = require('./../jwt');

const checkAdminRole = async (userID) => {
  try {
    const user = await User.findById(userID);
    return user && user.role === 'admin';
  } catch (err) {
    return false;
  }
};

// POST /asset
// Admin can add a new asset
router.post('/', jwtAuthMiddleware, async (req, res) => {
  try {
    if (!(await checkAdminRole(req.user._id))) {
      return res.status(403).json({ message: 'user does not have admin role' });
    }

    const newAsset = new Asset(req.body);
    const response = await newAsset.save();

    console.log('Asset added successfully');
    res.status(200).json(response);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// GET /asset
// Get all assets 
router.get('/', async (req, res) => {
  try {
    const assets = await Asset.find().sort({ updatedAt: -1 });

    console.log('Assets data fetched');
    res.status(200).json(assets);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// GET /asset/status/count
// Get total, active, inactive and maintenance asset count for dashboard cards
router.get('/status/count', async (req, res) => {
  try {
    const totalAssets = await Asset.countDocuments();
    const activeAssets = await Asset.countDocuments({ status: 'active' });
    const inactiveAssets = await Asset.countDocuments({ status: 'inactive' });
    const maintenanceAssets = await Asset.countDocuments({ status: 'maintenance' });

    res.status(200).json({
      totalAssets,
      activeAssets,
      inactiveAssets,
      maintenanceAssets
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// GET /asset/recent
// Get recently updated assets
router.get('/recent', async (req, res) => {
  try {
    const assets = await Asset.find().sort({ updatedAt: -1 }).limit(5);
    res.status(200).json(assets);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// GET /asset/:assetID
// Get details of one asset by id
router.get('/:assetID', async (req, res) => {
  try {
    const assetID = req.params.assetID;
    const asset = await Asset.findById(assetID);

    if (!asset) {
      return res.status(404).json({ error: 'Asset not found' });
    }

    res.status(200).json(asset);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// PUT /asset/:assetID
// Admin can update full asset details
router.put('/:assetID', jwtAuthMiddleware, async (req, res) => {
  try {
    if (!(await checkAdminRole(req.user._id))) {
      return res.status(403).json({ message: 'user does not have admin role' });
    }

    const assetID = req.params.assetID;
    const updatedAsset = req.body;

    const response = await Asset.findByIdAndUpdate(assetID, updatedAsset, {
      new: true,
      runValidators: true
    });

    if (!response) {
      return res.status(404).json({ error: 'Asset not found' });
    }

    console.log('Asset updated');
    res.status(200).json(response);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// PUT /asset/status/:assetID
// Update only asset status like active, inactive or maintenance
router.put('/status/:assetID', jwtAuthMiddleware, async (req, res) => {
  try {
    const assetID = req.params.assetID;
    const { status } = req.body;

    const response = await Asset.findByIdAndUpdate(
      assetID,
      { status },
      { new: true, runValidators: true }
    );

    if (!response) {
      return res.status(404).json({ error: 'Asset not found' });
    }

    console.log('Asset status updated');
    res.status(200).json(response);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// DELETE /asset/:assetID
// Admin can delete an asset
router.delete('/:assetID', jwtAuthMiddleware, async (req, res) => {
  try {
    if (!(await checkAdminRole(req.user._id))) {
      return res.status(403).json({ message: 'user does not have admin role' });
    }

    const assetID = req.params.assetID;
    const response = await Asset.findByIdAndDelete(assetID);

    if (!response) {
      return res.status(404).json({ error: 'Asset not found' });
    }

    console.log('Asset deleted');
    res.status(200).json(response);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
