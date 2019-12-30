import React from 'react';
import axios from 'axios';

import BaseLayout from '../../../components/layouts/BaseLayout';

const PortfolioDetail = props => {
  const { post } = props;
  return (
    <BaseLayout title={post.title}>
      <h1>{post.title}</h1>
      <p>{post.body}</p>
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
