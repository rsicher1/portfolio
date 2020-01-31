import React, { Fragment } from 'react';
import { Container, Row, Col } from 'reactstrap';

import BaseLayout from '../../components/layouts/BaseLayout';
import BasePage from '../../components/shared/BasePage';
import SlateEditor from '../../components/slate-editor/Editor';

const BlogEditor = props => {
  const { isAuthenticated, clientAuth, loading, error, user } = props;

  if (!isAuthenticated) {
    return (
      <BaseLayout
        isAuthenticated={isAuthenticated}
        clientAuth={clientAuth}
        loading={loading}
        title="Unauthenticated"
      >
        <BasePage>
          <h1>Cannot access Blog Editor page. Please login.</h1>
        </BasePage>
      </BaseLayout>
    );
  }

  if (user && !user.isSiteOwner) {
    return (
      <BaseLayout
        isAuthenticated={isAuthenticated}
        clientAuth={clientAuth}
        loading={loading}
        title="Unauthorized"
      >
        <BasePage>
          <h1>Unauthorized to access Blog Editor page.</h1>
        </BasePage>
      </BaseLayout>
    );
  }

  if (error) {
    return (
      <BaseLayout
        isAuthenticated={isAuthenticated}
        clientAuth={clientAuth}
        loading={loading}
        title={error && error.title}
      >
        <BasePage>
          <h1>{error && error.message}</h1>
        </BasePage>
      </BaseLayout>
    );
  }

  return (
    <BaseLayout
      isAuthenticated={isAuthenticated}
      clientAuth={clientAuth}
      loading={loading}
      title="Blog Editor"
    >
      <BasePage
        title="Blog Editor"
        containerClass="editor-wrapper"
        className="blog-editor-page"
      >
        <SlateEditor />
      </BasePage>
    </BaseLayout>
  );
};

export default BlogEditor;
