import React from 'react';
import {
  Modal as ModalChakra,
  ModalOverlay,
  ModalHeader,
  ModalBody,
  ModalContent,
  ModalCloseButton
} from '@chakra-ui/react';
import PropTypes from 'prop-types';

function Modal({ content, isOpen, onClose, title }) {
  return (
    <ModalChakra isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>
          <h3>{title}</h3>
          <ModalCloseButton />
        </ModalHeader>
        <ModalBody>{content}</ModalBody>
      </ModalContent>
    </ModalChakra>
  );
}

Modal.propTypes = {
  content: PropTypes.element.isRequired,
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  title: PropTypes.string
};

Modal.defaultProps = {
  title: 'Modal'
};

export default Modal;
