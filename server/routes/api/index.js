const express = require('express');
const secretRoutes = require('./secret');
const onlySiteOwnerRoutes = require('./onlysiteowner');
const booksRoutes = require('./books');
const portfolioItemsRoutes = require('./portfolioItems');

const router = express.Router();

router.use('/books', booksRoutes);
router.use('/portfolioitems', portfolioItemsRoutes);
router.use('/secret', secretRoutes);
router.use('/onlysiteowner', onlySiteOwnerRoutes);

module.exports = router;
