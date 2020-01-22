const PortfolioItem = require('../models/portfolioItem');

const getPortfolioItems = async (req, res, next) => {
  try {
    const portfolioItems = await PortfolioItem.find({}).sort('startDate');

    res.json(portfolioItems);
  } catch (err) {
    next(err);
  }
};

const getPortfolioItem = async (req, res, next) => {
  try {
    const portfolioItemId = req.params.id;

    const portfolioItem = await PortfolioItem.findById(portfolioItemId).select(
      '-__v'
    );
    if (!portfolioItem) {
      return res.status(404).json({
        title: '404 - Not Found',
        message: 'Portfolio item not found',
      });
    }

    res.status(201).json(portfolioItem);
  } catch (err) {
    if (err.name === 'CastError') {
      err.custom = true;
      err.status = 404;
      err.title = '404 - Not Found';
      err.message = 'Portfolio item not found';
    }
    next(err);
  }
};

const getPortfolioItemAuth = async (req, res, next) => {
  try {
    const portfolioItemId = req.params.id;

    const portfolioItem = await PortfolioItem.findById(portfolioItemId).select(
      '-__v'
    );

    if (!portfolioItem) {
      return res.status(404).json({
        title: '404 - Not Found',
        message: 'Portfolio item not found',
      });
    }

    if (req.user && req.user.sub !== portfolioItem.userId) {
      res.status(401).json({
        title: '401 - Unauthorized',
        message: 'Unauthorized to access this portfolio item',
      });
    }

    res.status(201).json(portfolioItem);
  } catch (err) {
    if (err.name === 'CastError') {
      err.custom = true;
      err.status = 404;
      err.title = '404 - Not Found';
      err.message = 'Portfolio item not found';
    }
    next(err);
  }
};

const createPortfolioItem = async (req, res, next) => {
  try {
    const portfolioItemData = req.body;

    //delete portfolioItemData.title;

    const portfolioItem = new PortfolioItem(portfolioItemData);
    portfolioItem.userId = req.user && req.user.sub;

    await portfolioItem.save();

    res.status(201).json(portfolioItem);
  } catch (err) {
    next(err);
  }
};

const updatePortfolioItem = async (req, res, next) => {
  try {
    const portfolioItemId = req.params.id;
    const portfolioItemData = req.body;

    const portfolioItem = await PortfolioItem.findById(portfolioItemId);

    if (!portfolioItem) {
      return res.status(404).json({
        title: '404 - Not Found',
        message: 'Portfolio item not found',
      });
    }

    if (req.user && req.user.sub !== portfolioItem.userId) {
      res.status(401).json({
        title: '401 - Unauthorized',
        message: 'Unauthorized to access this portfolio item',
      });
    }

    portfolioItem.set(portfolioItemData);

    await portfolioItem.save();

    res.status(201).json(portfolioItem);
  } catch (err) {
    if (err.name === 'CastError') {
      err.status = 404;
      (err.title = '404 - Not Found'),
        (err.message = "Portfolio item doesn't exist");
    }
    next(err);
  }
};

const deletePortfolioItem = async (req, res, next) => {
  try {
    const portfolioItemId = req.params.id;

    const portfolioItem = await PortfolioItem.findById(portfolioItemId);
    if (!portfolioItem) {
      return res.status(404).json({
        title: '404 - Not Found',
        message: 'Portfolio item not found',
      });
    }

    if (req.user && req.user.sub !== portfolioItem.userId) {
      res.status(401).json({
        title: '401 - Unauthorized',
        message: 'Unauthorized to access this portfolio item',
      });
    }

    await portfolioItem.remove();

    res.status(200).json({ message: 'Portfolio item deleted successfully' });
  } catch (err) {
    if (err.name === 'CastError') {
      err.status = 404;
      (err.title = '404 - Not Found'),
        (err.message = "Portfolio item doesn't exist");
    }
    next(err);
  }
};

module.exports = {
  getPortfolioItems,
  getPortfolioItem,
  getPortfolioItemAuth,
  createPortfolioItem,
  updatePortfolioItem,
  deletePortfolioItem,
};
