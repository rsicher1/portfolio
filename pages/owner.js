import React from 'react';
import BaseLayout from '../components/layouts/BaseLayout';
import BasePage from '../components/shared/BasePage';

import withAuth from '../components/hoc/withAuth';

const Owner = props => {
  const { isAuthenticated, clientAuth, loading, user } = props;

  return (
    <BaseLayout
      isAuthenticated={isAuthenticated}
      clientAuth={clientAuth}
      loading={loading}
      title="Owner"
    >
      <BasePage title="Owner">{user && <p>{user.email}</p>}</BasePage>
    </BaseLayout>
  );
};

export default withAuth('Owner', 'siteOwner')(Owner);
