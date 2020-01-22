import React, { useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import moment from 'moment';

const PortfolioItemCardDetail = props => {
  const { className, modalIsOpen, onToggleModal, item } = props;

  return (
    <div>
      <Modal isOpen={modalIsOpen} toggle={onToggleModal} className={className}>
        <ModalHeader toggle={onToggleModal}>{item.title}</ModalHeader>
        <ModalBody>
          <p>
            <b>Description: </b>
            {item.description}
          </p>
          <p>
            <b>Company: </b>
            {item.company}
          </p>
          <p>
            <b>Position: </b>
            {item.position}
          </p>
          <p>
            <b>Location: </b>
            {item.location}
          </p>
          <p>
            <b>Start Date: </b>
            {moment(item.startDate).format('MM/DD/YYYY')}
          </p>
          {item.endDate && (
            <p>
              <b>End Date: </b>
              {moment(item.endDate).format('MM/DD/YYYY')}
            </p>
          )}
        </ModalBody>
        <ModalFooter>
          <Button color="secondary" onClick={onToggleModal}>
            Close
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
};

export default PortfolioItemCardDetail;
