import App from 'next/app';
import React, { Fragment, useState, useEffect } from 'react';
import jwt from 'jsonwebtoken';

import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/main.scss';

import { Auth0Provider } from '../oauth0/react-oauth0-spa';
import { useAuth0 } from '../oauth0/react-oauth0-spa';
import config from '../oauth0/auth_config.json';
import { verifyToken, getCookieServer } from '../helpers/utils';

const AuthComponent = ({
  children,
  clientAuthServer,
  isAuthenticatedServer,
  userServer,
}) => {
  const { clientAuth, checkIsAuthenticated } = useAuth0();

  if (clientAuth || clientAuthServer) {
    checkIsAuthenticated();
  }

  const { loading, user, isAuthenticated } = useAuth0();

  return (
    <Fragment>
      {React.cloneElement(children, {
        isAuthenticated: isAuthenticated || isAuthenticatedServer,
        loading,
        clientAuth: clientAuth || clientAuthServer,
        user: user || userServer,
      })}
    </Fragment>
  );
};

const MyApp = ({
  Component,
  pageProps,
  clientAuthServer,
  isAuthenticatedServer,
  userServer,
}) => {
  return (
    <Auth0Provider
      domain={config.domain}
      client_id={config.clientId}
      redirect_uri={config.redirect_uri}
      onRedirectCallback={() => {}}
    >
      <AuthComponent
        isAuthenticatedServer={isAuthenticatedServer}
        userServer={userServer}
        clientAuthServer={clientAuthServer}
      >
        <Component {...pageProps} />
      </AuthComponent>
    </Auth0Provider>
  );
};

// Only uncomment this method if you have blocking data requirements for
// every single page in your application. This disables the ability to
// perform automatic static optimization, causing every page in your app to
// be server-side rendered.

MyApp.getInitialProps = async appContext => {
  // calls page's `getInitialProps` and fills `appProps.pageProps`

  let clientAuthServer = false;
  let isAuthenticatedServer = false;
  let userServer = null;
  if (!process.browser) {
    const { req, res } = appContext.ctx;

    const idToken = getCookieServer(req, 'id_token');
    if (idToken) {
      userServer = jwt.decode(idToken, { complete: true });
      const verifiedToken = await verifyToken(idToken, userServer);

      if (!verifiedToken) {
        res.clearCookie('id_token');
        res.clearCookie('auth0.is.authenticated');
      } else {
        userServer = userServer.payload;

        const expiresAt = userServer.exp * 1000;

        isAuthenticatedServer =
          userServer && verifiedToken && new Date().getTime() < expiresAt;
      }
    }
  } else {
    clientAuthServer = true;
  }

  const appProps = await App.getInitialProps(appContext);

  return {
    ...appProps,
    clientAuthServer,
    userServer,
    isAuthenticatedServer,
  };
};

export default MyApp;
