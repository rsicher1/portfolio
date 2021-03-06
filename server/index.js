const express = require('express');
const next = require('next');
const mongoose = require('mongoose');
const routes = require('./routes.js');
const config = require('../config');

const dev = process.env.NODE_ENV !== 'production';
const nextApp = next({ dev });
const handler = routes.getRequestHandler(nextApp);

const apiRoutes = require('./routes/api');

mongoose
  .connect(config.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('Connected to database'))
  .catch(err => console.log(err));

nextApp.prepare().then(() => {
  const app = express();

  app.use(express.json());

  app.use('/api', apiRoutes);

  app.get('*', (req, res) => {
    return handler(req, res);
  });
  app.post('*', (req, res) => {
    return handler(req, res);
  });
  app.put('*', (req, res) => {
    return handler(req, res);
  });
  app.patch('*', (req, res) => {
    return handler(req, res);
  });
  app.delete('*', (req, res) => {
    return handler(req, res);
  });

  app.use((err, req, res, next) => {
    if (err.name === 'UnauthorizedError') {
      return res.status(401).json({
        message: 'Unauthenticated or invalid token.',
      });
    }
    if (err.custom) {
      return res.status(err.status).json({
        title: err.title,
        message: err.message,
      });
    }
    return res.status(500).json({
      title: '500 - Internal Server Error',
      message: 'Internal server error. Please try again later',
    });
  });

  const PORT = process.env.PORT || 3000;

  app.listen(PORT, err => {
    if (err) throw err;
    console.log('> Ready on port ' + PORT);
  });
});
