const express = require('express');
const { checkJWT, checkRole } = require('../../../services/auth');

const {
  getPortfolioItems,
  getPortfolioItem,
  createPortfolioItem,
  updatePortfolioItem,
  deletePortfolioItem,
  getPortfolioItemAuth,
} = require('../../../controllers/portfolioItems');

const router = express.Router();

router.get('/', getPortfolioItems);

router.get('/:id', getPortfolioItem);

router.get('/:id/auth', checkJWT, checkRole('siteOwner'), getPortfolioItemAuth);

router.post('/', checkJWT, checkRole('siteOwner'), createPortfolioItem);

router.patch('/:id', checkJWT, checkRole('siteOwner'), updatePortfolioItem);

router.delete('/:id', checkJWT, checkRole('siteOwner'), deletePortfolioItem);

module.exports = router;
