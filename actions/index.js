import axios from 'axios';

import Cookies from 'js-cookie';
import { getCookieServer } from '../helpers/utils';

const setAuthHeader = req => {
  const token = req
    ? getCookieServer(req, 'id_token')
    : Cookies.get('id_token');
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};

const getSecretData = async () => {
  const res = await axios.get('/api/secret', setAuthHeader());
  return await res.data;
};

const getSecretDataServer = async req => {
  const res = await axios.get(
    'http://localhost:3000/api/secret',
    setAuthHeader(req)
  );
  return await res.data;
};

export { getSecretDataServer, getSecretData };
