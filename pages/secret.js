import React, { useEffect, useState, useCallback } from 'react';
import BaseLayout from '../components/layouts/BaseLayout';
import BasePage from '../components/shared/BasePage';
import withAuth from '../components/hoc/withAuth';

import { getSecretData, getSecretDataServer } from '../actions';

const Secret = props => {
  const { isAuthenticated, clientAuth, loading, secretDataServer } = props;

  const displaySecretData = useCallback(() => {
    if (secretDataServer && secretDataServer.length > 0) {
      return secretDataServer.map((data, i) => {
        return (
          <div key={i}>
            <p>{data.title}</p>
            <p>{data.description}</p>
          </div>
        );
      });
    }
  });

  return (
    <BaseLayout
      isAuthenticated={isAuthenticated}
      clientAuth={clientAuth}
      loading={loading}
      title="Secret"
    >
      <BasePage>
        <h1>Secret Page</h1>
        {displaySecretData()}
      </BasePage>
    </BaseLayout>
  );
};

Secret.getInitialProps = async ({ req }) => {
  try {
    const secretDataServer = await (process.browser
      ? getSecretData()
      : getSecretDataServer(req));
    return { secretDataServer };
  } catch (err) {
    return {
      secretDataServer: null,
      error: {
        message: err.response.data.message,
        status: err.response.status,
      },
    };
  }
};

export default withAuth('Secret')(Secret);
