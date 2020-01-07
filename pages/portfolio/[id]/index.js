import React from 'react';
import axios from 'axios';

import BaseLayout from '../../../components/layouts/BaseLayout';
import BasePage from '../../../components/shared/BasePage';

const PortfolioDetail = props => {
  const { post, isAuthenticated, clientAuth, loading } = props;
  return (
    <BaseLayout
      isAuthenticated={isAuthenticated}
      clientAuth={clientAuth}
      loading={loading}
      title={post.title}
    >
      <BasePage>
        <h1>{post.title}</h1>
        <p>{post.body}</p>
      </BasePage>
    </BaseLayout>
  );
};

PortfolioDetail.getInitialProps = async ({ query }) => {
  try {
    const res = await axios.get(
      `https://jsonplaceholder.typicode.com/posts/${query.id}`
    );
    const post = await res.data;
    return { post };
  } catch (err) {
    console.log(err);
    return { post: null };
  }
};

export default PortfolioDetail;
