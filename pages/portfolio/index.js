import React from 'react';
import axios from 'axios';
import Link from 'next/link';

import BaseLayout from '../../components/layouts/BaseLayout';

const Portfolio = props => {
  const { posts } = props;

  const renderPosts = posts => {
    return posts.map(post => {
      return (
        <li key={post.id}>
          <Link href="/portfolio/[id]" as={`/portfolio/${post.id}`}>
            <a>{post.title}</a>
          </Link>
        </li>
      );
    });
  };

  return (
    <BaseLayout title="Portfolio">
      <h1>Portfolio</h1>
      <div>Portfolio page</div>
      <ul>{renderPosts(posts)}</ul>
    </BaseLayout>
  );
};

Portfolio.getInitialProps = async () => {
  try {
    const res = await axios.get('https://jsonplaceholder.typicode.com/posts');
    const posts = await res.data;
    return { posts: posts.slice(0, 20) };
  } catch (err) {
    console.log(err);
    return { posts: null };
  }
};

export default Portfolio;
