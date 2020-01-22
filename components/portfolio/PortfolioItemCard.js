import React, { useState, useCallback } from 'react';

import { Card, CardHeader, CardBody, CardTitle, CardText } from 'reactstrap';

import PortfolioItemCardDetail from './PortfolioItemCardDetail';

const PortfolioItemCard = props => {
  const { item } = props;

  const [modalIsOpen, setModalIsOpen] = useState(false);

  const toggleModalHandler = useCallback(() => setModalIsOpen(!modalIsOpen));

  return (
    <span>
      <PortfolioItemCardDetail
        modalIsOpen={modalIsOpen}
        onToggleModal={toggleModalHandler}
        item={item}
      />
      <Card className="portfolio-card" onClick={toggleModalHandler}>
        <CardHeader className="portfolio-card-header">
          {item.position}
        </CardHeader>
        <CardBody>
          <p className="portfolio-card-city"> {item.location} </p>
          <CardTitle className="portfolio-card-title">{item.title}</CardTitle>
          <CardText className="portfolio-card-text">
            {item.description}
          </CardText>
          <div className="readMore">{props.children}</div>
        </CardBody>
      </Card>
    </span>
  );
};

export default PortfolioItemCard;
