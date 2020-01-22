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
      <BasePage title="CV">
        <div>My CV</div>
      </BasePage>
    </BaseLayout>
  );
};

export default CV;
