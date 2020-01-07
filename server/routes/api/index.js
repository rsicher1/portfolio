const express = require('express');
const secretRoutes = require('./secret');
const onlySiteOwnerRoutes = require('./onlysiteowner');

const router = express.Router();

router.use('/secret', secretRoutes);
router.use('/onlysiteowner', onlySiteOwnerRoutes);

module.exports = router;
