import React, { useState, useCallback } from 'react';
import BaseLayout from '../../components/layouts/BaseLayout';
import BasePage from '../../components/shared/BasePage';
import PortfolioForm from '../../components/portfolio/PortfolioForm';
import withAuth from '../../components/hoc/withAuth';
import { useRouter } from 'next/router';

import { createPortfolioItem } from '../../actions';

import { Row, Col } from 'reactstrap';

const INITIAL_VALUES = {
  title: '',
  company: '',
  location: '',
  position: '',
  description: '',
  startDate: '',
  endDate: '',
  endDateIsDisabled: false,
};

const PortfolioNew = props => {
  const { isAuthenticated, loading, clientAuth, user } = props;

  const [error, setError] = useState();

  const router = useRouter();

  const savePortfolioItemHandler = useCallback(
    async (data, { setSubmitting }) => {
      try {
        await createPortfolioItem(data);
        setError(undefined);
        router.push('/portfolio');
      } catch (err) {
        setError(err.message || 'Server Error. Please try again later.');
        setSubmitting(false);
        console.log(err);
      }
    }
  );

  if (!isAuthenticated) {
    return (
      <BaseLayout
        isAuthenticated={isAuthenticated}
        clientAuth={clientAuth}
        loading={loading}
        title="Unauthenticated"
      >
        <BasePage>
          <h1>Cannot access New Portfolio Item page. Please login.</h1>
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
          <h1>Unauthorized to access New Portfolio Item page.</h1>
        </BasePage>
      </BaseLayout>
    );
  }

  return (
    <BaseLayout
      isAuthenticated={isAuthenticated}
      clientAuth={clientAuth}
      loading={loading}
      title="Create New Portfolio Item"
    >
      <BasePage
        title="Create New Portfolio Item"
        className="portfolio-create-page"
      >
        <Row>
          <Col md="6">
            <PortfolioForm
              error={error}
              itemInitialValues={INITIAL_VALUES}
              onSavePortfolioItem={savePortfolioItemHandler}
            />
          </Col>
        </Row>
      </BasePage>
    </BaseLayout>
  );
};

export default PortfolioNew;
