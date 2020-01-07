import React, { useState, useEffect, useContext } from 'react';
import createAuth0Client from '@auth0/auth0-spa-js';
import Cookies from 'js-cookie';
import jwt from 'jsonwebtoken';
import { verifyToken } from '../helpers/utils';

const DEFAULT_REDIRECT_CALLBACK = () =>
  window.history.replaceState({}, document.title, window.location.pathname);

export const Auth0Context = React.createContext();
export const useAuth0 = () => useContext(Auth0Context);
export const Auth0Provider = ({
  children,
  onRedirectCallback = DEFAULT_REDIRECT_CALLBACK,
  ...initOptions
}) => {
  const [isAuthenticated, setIsAuthenticated] = useState();
  const [clientAuth, setClientAuth] = useState();
  const [user, setUser] = useState();
  const [tokens, setTokens] = useState();
  const [auth0Client, setAuth0] = useState();
  const [loading, setLoading] = useState(true);
  const [popupOpen, setPopupOpen] = useState(false);

  useEffect(() => {
    const initAuth0 = async () => {
      const auth0FromHook = await createAuth0Client(initOptions);
      setAuth0(auth0FromHook);

      if (window.location.search.includes('code=')) {
        const { appState } = await auth0FromHook.handleRedirectCallback();
        onRedirectCallback(appState);
      }

      const isAuthenticated = await auth0FromHook.isAuthenticated();

      setIsAuthenticated(isAuthenticated);

      if (isAuthenticated) {
        const accessToken = await auth0FromHook.getTokenSilently();
        const user = await auth0FromHook.getIdTokenClaims();
        setUser(user);
        setTokens({
          accessToken,
          idToken: user.__raw,
        });
      }

      setLoading(false);
    };
    initAuth0();
    // eslint-disable-next-line
  }, []);

  const checkIsAuthenticated = async (params = {}) => {
    if (tokens && tokens.idToken) {
      const decodedIdToken = jwt.decode(tokens.idToken, { complete: true });

      let verifiedToken = null;
      if (decodedIdToken) {
        verifiedToken = await verifyToken(tokens.idToken, decodedIdToken);
      }

      const isAuthenticated = await auth0Client.isAuthenticated();

      setIsAuthenticated(isAuthenticated);
      if (!verifiedToken || !isAuthenticated) {
        setIsAuthenticated(false);
        setUser(undefined);
        setTokens(undefined);
        Cookies.remove('id_token');
        Cookies.remove('auth0.is.authenticated');
      }
    } else {
      setIsAuthenticated(false);
    }
  };

  const loginWithPopup = async (params = {}) => {
    setClientAuth(true);
    setPopupOpen(true);
    let accessToken = null;
    let idTokenClaim = null;
    try {
      await auth0Client.loginWithPopup(params);
      accessToken = await auth0Client.getTokenSilently();
      idTokenClaim = await auth0Client.getIdTokenClaims();
      // user = await auth0Client.getUser();

      setTokens({
        accessToken,
        idToken: idTokenClaim.__raw,
      });

      Cookies.set('id_token', idTokenClaim.__raw);

      setUser(idTokenClaim);
      setIsAuthenticated(true);
    } catch (error) {
      console.error(error);
    } finally {
      setPopupOpen(false);
    }
  };

  const logout = (params = {}) => {
    Cookies.remove('id_token');

    auth0Client.logout(params);
  };

  const handleRedirectCallback = async () => {
    setLoading(true);
    await auth0Client.handleRedirectCallback();
    const user = await auth0Client.getUser();
    setLoading(false);
    setIsAuthenticated(true);
    setUser(user);
  };
  return (
    <Auth0Context.Provider
      value={{
        isAuthenticated,
        checkIsAuthenticated,
        user,
        tokens,
        clientAuth,
        loading,
        popupOpen,
        loginWithPopup,
        handleRedirectCallback,
        getIdTokenClaims: (...p) => auth0Client.getIdTokenClaims(...p),
        loginWithRedirect: (...p) => auth0Client.loginWithRedirect(...p),
        getTokenSilently: (...p) => auth0Client.getTokenSilently(...p),
        getTokenWithPopup: (...p) => auth0Client.getTokenWithPopup(...p),
        logout, //: (...p) => auth0Client.logout(...p),
      }}
    >
      {children}
    </Auth0Context.Provider>
  );
};
