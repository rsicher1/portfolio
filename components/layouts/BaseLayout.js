import React, { useEffect } from 'react';
import Head from 'next/head';
import Header from '../shared/Header';

const BaseLayout = props => {
  const { title, className, isAuthenticated, clientAuth, loading } = props;

  return (
    <div className="layout-container">
      <Head>
        <title>{title}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header
        loading={loading}
        clientAuth={clientAuth}
        isAuthenticated={isAuthenticated}
      />
      <main className={`cover ${className}`}>
        <div className="wrapper">{props.children}</div>
      </main>
    </div>
  );
};

BaseLayout.defaultProps = {
  className: '',
};

export default BaseLayout;
