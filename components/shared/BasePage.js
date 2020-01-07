import React from 'react';
import PropTypes from 'prop-types';
import { Container } from 'reactstrap';

const BasePage = props => {
  const { className } = props;

  return (
    <div className={`base-page ${className}`}>
      <Container>{props.children}</Container>
    </div>
  );
};

BasePage.defaultProps = {
  className: '',
};

BasePage.propTypes = {
  className: PropTypes.string.isRequired,
};

export default BasePage;
