import React from 'react';
import PropTypes from 'prop-types';

const TableHeader = (props) => {
  return (
    <div>
      <span>
        <h3>Employees</h3>
        <div>filter icon</div>
        <select name="country" id="country-select">
          <option value="dog">Dog</option>
          <option value="cat">Cat</option>
          <option value="hamster">Hamster</option>
        </select>
        <select name="gender" id="gender-select">
          <option value="dog">Dog</option>
          <option value="cat">Cat</option>
          <option value="hamster">Hamster</option>
        </select>
      </span>
    </div>
  );
};

TableHeader.propTypes = {};

export default TableHeader;
