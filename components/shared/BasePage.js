import React from 'react';
import PropTypes from 'prop-types';
import { Container } from 'reactstrap';

const BasePage = props => {
  const { className, title, containerClass } = props;

  return (
    <div className={`base-page ${className}`}>
      <Container className={containerClass}>
        {' '}
        {title && (
          <div className="page-header">
            <h1 className="page-header-title">{title}</h1>
          </div>
        )}
        {props.children}
      </Container>
    </div>
  );
};

BasePage.defaultProps = {
  className: '',
  containerClass: '',
};

BasePage.propTypes = {
  className: PropTypes.string.isRequired,
};

export default BasePage;
