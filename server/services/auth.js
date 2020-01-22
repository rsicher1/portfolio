const jwt = require('express-jwt');
const oAuth0Config = require('../../config').OAUTH0;
const jwksRsa = require('jwks-rsa');

const checkJWT = jwt({
  secret: jwksRsa.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 15,
    jwksUri: `https://${oAuth0Config.DOMAIN}/.well-known/jwks.json`,
  }),
  audience: oAuth0Config.CLIENT_ID,
  issuer: `https://${oAuth0Config.DOMAIN}/`,
  algorithms: ['RS256'],
});

const checkRole = role => (req, res, next) => {
  const { user } = req;
  if (user && user['http://localhost:3000/role'].includes(role)) {
    return next();
  }

  res.status(401).json({
    title: '401 - Unauthorized',
    message: 'Unauthorized to access this resource',
  });
};

module.exports = { checkRole, checkJWT };
