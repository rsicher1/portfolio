import React from 'react';
import BaseLayout from '../components/layouts/BaseLayout';
import BasePage from '../components/shared/BasePage';

const CV = props => {
  const { isAuthenticated, clientAuth, loading } = props;

  return (
    <BaseLayout
      isAuthenticated={isAuthenticated}
      clientAuth={clientAuth}
      loading={loading}
      title="CV"
    >
      <BasePage>
        <h1>CV</h1>
        <div>My CV</div>
      </BasePage>
    </BaseLayout>
  );
};

export default CV;
