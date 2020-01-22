import axios from 'axios';

import Cookies from 'js-cookie';
import { getCookieServer } from '../helpers/utils';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:3000/api',
  timeout: 3000,
});

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

const handleResError = err => {
  let error;
  if (err && err.response && err.response.data) {
    error = {
      message: err.response.data.message,
      title: err.response.status + ' - ' + err.response.statusText,
    };
  } else {
    error = err;
  }
  return Promise.reject(error);
};

const getSecretData = async req => {
  const res = await axiosInstance.get('/secret', setAuthHeader(req));
  return res.data;
};

const getPortfolioItems = async () => {
  const res = await axiosInstance.get('/portfolioitems');
  return res.data;
};

const getPortfolioItem = async id => {
  try {
    const res = await axiosInstance.get(`/portfolioitems/${id}`);
    return res.data;
  } catch (err) {
    return handleResError(err);
  }
};

const getPortfolioItemAuth = async (id, req) => {
  try {
    const res = await axiosInstance.get(
      `/portfolioitems/${id}/auth`,
      setAuthHeader(req)
    );
    return res.data;
  } catch (err) {
    return handleResError(err);
  }
};

const createPortfolioItem = async portfolioData => {
  try {
    const res = await axiosInstance.post(
      '/portfolioitems',
      portfolioData,
      setAuthHeader()
    );
    return res.data;
  } catch (err) {
    return handleResError(err);
  }
};

const editPortfolioItem = async (itemId, portfolioData) => {
  try {
    const res = await axiosInstance.patch(
      `/portfolioitems/${itemId}`,
      portfolioData,
      setAuthHeader()
    );
    return res.data;
  } catch (err) {
    return handleResError(err);
  }
};

const deletePortfolioItem = async itemId => {
  try {
    const res = await axiosInstance.delete(
      `/portfolioitems/${itemId}`,
      setAuthHeader()
    );
    return res.data;
  } catch (err) {
    return handleResError(err);
  }
};

export {
  getSecretData,
  getPortfolioItems,
  createPortfolioItem,
  getPortfolioItem,
  getPortfolioItemAuth,
  deletePortfolioItem,
  editPortfolioItem,
};
