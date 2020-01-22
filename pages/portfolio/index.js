import React, { Fragment, useCallback, useState } from 'react';
import Link from 'next/link';
import { Row, Col, Button } from 'reactstrap';

import Router from 'next/router';

import { getPortfolioItems, deletePortfolioItem } from '../../actions';

import BaseLayout from '../../components/layouts/BaseLayout';
import BasePage from '../../components/shared/BasePage';
import PortfolioItemCard from '../../components/portfolio/PortfolioItemCard';

const Portfolio = props => {
  const { items, isAuthenticated, clientAuth, loading, user } = props;

  const [itemsLocal, setItemsLocal] = useState(items);

  const deleteItemHandler = useCallback(
    itemId => {
      deletePortfolioItem(itemId);
    },
    [deletePortfolioItem]
  );

  const displayDeleteWarningHandler = useCallback(
    async (itemTitle, itemId, e) => {
      e.stopPropagation();
      const isConfirm = confirm(
        `Are you sure you want to delete '${itemTitle}'?`
      );
      if (isConfirm) {
        await deleteItemHandler(itemId);
        setItemsLocal(itemsLocal.filter(item => item._id !== itemId));
      }
      return false;
    },
    [deleteItemHandler, Router]
  );

  const renderItems = useCallback(items => {
    return items.map(item => (
      <Col md="4" key={item._id}>
        <PortfolioItemCard item={item}>
          {isAuthenticated && user && user.isSiteOwner && (
            <Fragment>
              <Button
                color="warning"
                role="link"
                onClick={e => {
                  e.stopPropagation();
                  Router.push(
                    '/portfolio/[id]/edit',
                    `/portfolio/${item._id}/edit`
                  );
                }}
              >
                Edit
              </Button>

              <Button
                color="danger"
                role="link"
                style={{ marginLeft: '10px' }}
                onClick={e =>
                  displayDeleteWarningHandler(item.title, item._id, e)
                }
              >
                Delete
              </Button>
            </Fragment>
          )}
        </PortfolioItemCard>
      </Col>
    ));
  });

  return (
    <BaseLayout
      isAuthenticated={isAuthenticated}
      clientAuth={clientAuth}
      loading={loading}
      title="Portfolio"
    >
      <BasePage title="Portfolio" className="portfolio-page">
        <Row>{renderItems(itemsLocal)}</Row>
        {isAuthenticated && user && user.isSiteOwner && (
          <Link href="/portfolio/new">
            <Button color="success" size="lg" role="link">
              New
            </Button>
          </Link>
        )}
      </BasePage>
    </BaseLayout>
  );
};

Portfolio.getInitialProps = async () => {
  try {
    const items = await getPortfolioItems();
    return { items };
  } catch (err) {
    console.log(err);
    return { items: null };
  }
};

export default Portfolio;
