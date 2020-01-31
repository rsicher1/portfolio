import React, { useEffect } from 'react';
import Head from 'next/head';
import Header from '../shared/Header';

const BaseLayout = props => {
  const { title, className, isAuthenticated, clientAuth, loading } = props;
  const headerType = props.headerType || 'default';

  return (
    <div className="layout-container">
      <Head>
        <title>{title}</title>
        <link
          href="https://fonts.googleapis.com/icon?family=Material+Icons"
          rel="stylesheet"
        />

        <link rel="icon" href="/favicon.ico" />
        <script
          src="https://kit.fontawesome.com/f41c6dcd85.js"
          crossOrigin="anonymous"
        ></script>
      </Head>
      <Header
        className={`port-nav-${headerType}`}
        headerType={headerType}
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
