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
      <BasePage className="about-page">
        <h1>About</h1>
        <div>My bio</div>
      </BasePage>
    </BaseLayout>
  );
};

export default About;
