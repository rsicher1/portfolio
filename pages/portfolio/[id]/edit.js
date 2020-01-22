import React, { useState, useCallback, useEffect } from 'react';
import BaseLayout from '../../../components/layouts/BaseLayout';
import BasePage from '../../../components/shared/BasePage';
import PortfolioForm from '../../../components/portfolio/PortfolioForm';
import withAuth from '../../../components/hoc/withAuth';
import router from 'next/router';

import { getPortfolioItemAuth, editPortfolioItem } from '../../../actions';

import { Row, Col } from 'reactstrap';

const INITIAL_TOUCHED = {
  title: true,
  company: true,
  location: true,
  position: true,
  description: true,
  startDate: true,
  endDate: true,
  endDateIsDisabled: true,
};

const PortfolioEdit = props => {
  const { isAuthenticated, loading, clientAuth, item, error, user } = props;

  const [errorLocal, setErrorLocal] = useState(isAuthenticated && error);
  const [itemLocal, setItemLocal] = useState(item);
  const [errorForm, setErrorForm] = useState();

  useEffect(() => {
    (async () => {
      if (isAuthenticated && !itemLocal) {
        try {
          const itemTemp = await getPortfolioItemAuth(router.query.id);
          setErrorLocal(undefined);
          setItemLocal(itemTemp);
        } catch (err) {
          setErrorLocal(err);
          setItemLocal(undefined);
        }
      }
    })();
  }, [isAuthenticated]);

  let itemInitialValues = {
    ...itemLocal,
    startDate: itemLocal ? new Date(itemLocal.startDate) : '',
    endDate: itemLocal
      ? itemLocal.endDate
        ? new Date(itemLocal.endDate)
        : ''
      : '',
    endDateIsDisabled: itemLocal && !itemLocal.endDate,
  };

  delete itemInitialValues._id;

  const savePortfolioItemHandler = useCallback(
    async (data, { setSubmitting }) => {
      try {
        await editPortfolioItem(itemLocal._id, data);
        setErrorForm(undefined);
        router.push('/portfolio');
      } catch (err) {
        setErrorForm(err);
        setSubmitting(false);
        console.log(err);
      }
    },

    [router, item]
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
          <h1>Cannot access Edit Portfolio Item page. Please login.</h1>
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
          <h1>Unauthorized to access Edit Portfolio Item page.</h1>
        </BasePage>
      </BaseLayout>
    );
  }

  if (errorLocal) {
    return (
      <BaseLayout
        isAuthenticated={isAuthenticated}
        clientAuth={clientAuth}
        loading={loading}
        title={errorLocal && errorLocal.title}
      >
        <BasePage>
          <h1>{errorLocal && errorLocal.message}</h1>
        </BasePage>
      </BaseLayout>
    );
  }

  return (
    <BaseLayout
      isAuthenticated={isAuthenticated}
      clientAuth={clientAuth}
      loading={loading}
      title="Edit Portfolio Item"
    >
      <BasePage title="Edit Portfolio Item" className="portfolio-create-page">
        <Row>
          <Col md="6">
            {itemLocal && (
              <PortfolioForm
                error={errorForm}
                edit={true}
                itemInitialValues={itemInitialValues}
                itemInitialTouched={INITIAL_TOUCHED}
                onSavePortfolioItem={savePortfolioItemHandler}
              />
            )}
          </Col>
        </Row>
      </BasePage>
    </BaseLayout>
  );
};

PortfolioEdit.getInitialProps = async ({ query, req }) => {
  try {
    const item = await getPortfolioItemAuth(query.id, req);
    return { item, error: null };
  } catch (err) {
    return { item: null, error: err };
  }
};

export default PortfolioEdit;
