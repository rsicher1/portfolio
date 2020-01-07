import axios from 'axios';
import jwt from 'jsonwebtoken';

const getJWKS = async () => {
  const res = await axios.get(
    'https://dev-7klesmar.auth0.com/.well-known/jwks.json'
  );
  const jwks = await res.data;
  return jwks;
};

export const verifyToken = async (idToken, decodedToken) => {
  if (idToken && decodedToken) {
    try {
      const jwks = await getJWKS();
      const jwk = jwks.keys[0];

      let cert = jwk.x5c[0];
      cert = cert.match(/.{1,64}/g).join('\n');
      cert = `-----BEGIN CERTIFICATE-----\n${cert}\n-----END CERTIFICATE-----\n`;

      if (jwk.kid === decodedToken.header.kid) {
        const verifiedToken = jwt.verify(idToken, cert);
        return verifiedToken;
      }
    } catch (err) {
      console.log(err);
      return undefined;
    }
  }
  return undefined;
};

export const getCookieServer = (req, name) => {
  const cookie = req.headers.cookie
    .split(';')
    .find(c => c.trim().startsWith(`${name}=`));

  if (cookie) {
    return cookie.split('=')[1];
  }
  return undefined;
};
