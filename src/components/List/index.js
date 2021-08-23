import React from 'react';
import PropTypes from 'prop-types';
import './list.css';

const List = ({ children }) => {
  return <ul className="list">{children}</ul>;
};

List.propTypes = {
  children: PropTypes.node.isRequired,
};

export default List;
