import React, { useCallback } from 'react';
import BaseLayout from '../layouts/BaseLayout';
import BasePage from '../shared/BasePage';

const withAuth = (title, role) => Component => {
  const withAuth = props => {
    const { isAuthenticated, clientAuth, loading, error, user } = props;
    let isAuthorized = false;
    const renderProtectedPage = useCallback(() => {
      if (isAuthenticated && !error) {
        const userRoles = user && user['http://localhost:3000/role'];
        if (
          !role ||
          (role &&
            userRoles &&
            userRoles.length > 0 &&
            userRoles.includes(role))
        ) {
          isAuthorized = true;
        }
      }

      if (error && error.status === 500) {
        return (
          <BaseLayout
            isAuthenticated={isAuthenticated}
            clientAuth={clientAuth}
            loading={loading}
            title="500 - Server error"
          >
            <BasePage>
              <h1>{error.message}</h1>
            </BasePage>
          </BaseLayout>
        );
      }

      if (!isAuthenticated) {
        return (
          <BaseLayout
            isAuthenticated={isAuthenticated}
            clientAuth={clientAuth}
            loading={loading}
            title="Unauthenticated"
          >
            <BasePage>
              <h1>Cannot access {title} page. Please login.</h1>
            </BasePage>
          </BaseLayout>
        );
      }

      if (!isAuthorized) {
        return (
          <BaseLayout
            isAuthenticated={isAuthenticated}
            clientAuth={clientAuth}
            loading={loading}
            title="Unauthorized"
          >
            <BasePage>
              <h1>Cannot access {title} page. Unauthorized.</h1>
            </BasePage>
          </BaseLayout>
        );
      }

      return <Component {...props} />;
    }, [Component, title, isAuthenticated, clientAuth, loading, isAuthorized]);

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
