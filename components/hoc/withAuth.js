import React, { useCallback, useEffect, useState } from 'react';
import BaseLayout from '../layouts/BaseLayout';
import BasePage from '../shared/BasePage';

const withAuth = (title, role) => Component => {
  const withAuth = props => {
    const { isAuthenticated, clientAuth, loading, error } = props;

    const [errorLocal, setErrorLocal] = useState();

    const renderProtectedPage = useCallback(() => {
      return <Component {...props} setErrorLocal={setErrorLocal} />;
    }, [
      Component,
      title,
      isAuthenticated,
      clientAuth,
      loading,
      errorLocal,
      error,
    ]);

    return renderProtectedPage();
  };

  withAuth.getInitialProps = async ctx => {
    const pageProps =
      Component.getInitialProps && (await Component.getInitialProps(ctx));

    return { ...pageProps };
  };

  return withAuth;
};

export default withAuth;
