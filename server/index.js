const express = require('express');
const next = require('next');
const routes = require('./routes');

const dev = process.env.NODE_ENV !== 'production';
const nextApp = next({ dev });
const handler = routes.getRequestHandler(nextApp);

// const apiRoutes = require('./routes/api');

nextApp.prepare().then(() => {
  const app = express();

  app.use(express.json());

  // app.use('/api', apiRoutes);

  /*
    app.get('*', (req, res) => {
      return handler(req, res);
    });
    app.post('*', (req, res) => {
      return handle(req, res);
    });
    app.patch('*', (req, res) => {
      return handle(req, res);
    });
    app.delete('*', (req, res) => {
      return handle(req, res);
  });
  */

  const PORT = process.env.PORT || 3000;

  express()
    .use(handler)
    .listen(PORT, err => {
      if (err) throw err;
      console.log('> Ready on port ' + PORT);
    });
});
