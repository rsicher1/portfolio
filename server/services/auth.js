const jwt = require('express-jwt');
const config = require('../../oauth0/auth_config.json');
const jwksRsa = require('jwks-rsa');

const checkJWT = jwt({
  secret: jwksRsa.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 15,
    jwksUri: `https://${config.domain}/.well-known/jwks.json`,
  }),
  audience: config.clientId,
  issuer: `https://${config.domain}/`,
  algorithms: ['RS256'],
});

const checkRole = role => (req, res, next) => {
  const { user } = req;
  if (user && user['http://localhost:3000/role'].includes(role)) {
    return next();
  }
  res.status(401).send({ message: 'Unauthorized to access this resource' });
};

module.exports = { checkRole, checkJWT };
