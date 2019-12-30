import React from 'react';
import axios from 'axios';

import BaseLayout from '../components/layouts/BaseLayout';

const Home = props => {
  const { todo } = props;

  return (
    <BaseLayout title="Home">
      <h1>Index</h1>
      <h2>Welcome!</h2>
      <div>{todo && todo.title}</div>
    </BaseLayout>
  );
};

Home.getInitialProps = async () => {
  try {
    const res = await axios.get('https://jsonplaceholder.typicode.com/todos/1');
    const todo = await res.data;
    return { todo };
  } catch (err) {
    console.log(err);
    return { todo: null };
  }
};

export default Home;
