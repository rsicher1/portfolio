const express = require('express');
const { checkJWT, checkRole } = require('../../../services/auth');

const router = express.Router();

const secretData = [
  {
    title: 'Secret data 1',
    description: 'Plans for how to build spaceship',
  },
  {
    title: 'Secret data 2',
    description: 'My secret passwords',
  },
];

router.get('/', checkJWT, checkRole('siteOwner'), (req, res, next) => {
  res.json(secretData);
});

module.exports = router;
