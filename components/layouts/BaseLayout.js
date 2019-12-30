import React from 'react';
import Head from 'next/head';
import Header from '../shared/Header';

const BaseLayout = props => {
  const { title } = props;
  return (
    <div>
      <Head>
        <title>{title}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header title={'App'} />
      {props.children}
    </div>
  );
};

export default BaseLayout;
