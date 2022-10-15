import React from 'react';
import { Input, InputGroup, InputLeftElement } from '@chakra-ui/react';
import { RiSearchLine } from 'react-icons/ri';
import PropTypes from 'prop-types';

function Searchbar(props) {
  const { placeholder } = props;
  return (
    <InputGroup className="Searchbar">
      <InputLeftElement pointerEvents="none" className="Searchbar__icon">
        <RiSearchLine color="gray.300" className="Searchbar__icon_icon" />
      </InputLeftElement>
      <Input
        type="search"
        placeholder={placeholder}
        className="Searchbar__input"
      />
    </InputGroup>
  );
}

Searchbar.propTypes = {
  placeholder: PropTypes.string
};

Searchbar.defaultProps = {
  placeholder: 'Introduce tu busqueda'
};

export default Searchbar;
