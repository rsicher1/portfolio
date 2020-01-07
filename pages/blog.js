import React from 'react';
import BaseLayout from '../components/layouts/BaseLayout';
import BasePage from '../components/shared/BasePage';

const Blog = props => {
  const { isAuthenticated, clientAuth, loading } = props;

  return (
    <BaseLayout
      isAuthenticated={isAuthenticated}
      clientAuth={clientAuth}
      loading={loading}
      title="Blog"
    >
      <BasePage>
        <h1>Blog</h1>
        <div>Posts</div>
      </BasePage>
    </BaseLayout>
  );
};

export default Blog;
