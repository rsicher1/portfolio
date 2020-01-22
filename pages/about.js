import React from 'react';
import BaseLayout from '../components/layouts/BaseLayout';
import BasePage from '../components/shared/BasePage';

const About = props => {
  const { isAuthenticated, loading, clientAuth } = props;

  return (
    <BaseLayout
      isAuthenticated={isAuthenticated}
      clientAuth={clientAuth}
      loading={loading}
      title="About"
    >
      <BasePage title="About" className="about-page">
        <div>My bio</div>
      </BasePage>
    </BaseLayout>
  );
};

export default About;
