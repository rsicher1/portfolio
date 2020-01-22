import React, { useState, useCallback, useEffect, Fragment } from 'react';
import DatePicker from 'react-datepicker';
// import moment from 'moment';
import { FormGroup, Label, Input } from 'reactstrap';

import 'react-datepicker/dist/react-datepicker.css';

const PortDate = ({
  label,
  field,
  field: { name, value }, //{ name, value, onChange, onBlur }
  form: { touched, errors, setFieldValue }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
  maxDate,
  setMaxDate,
  minDate,
  setMinDate,
  canBeDisabled,
  isDisabled,
  isItem,
  ...props
}) => {
  const handleChange = useCallback(
    date => {
      setFieldValue(name, date);
      if (setMaxDate) {
        setMaxDate(date);
      } else if (setMinDate) {
        setMinDate(date);
      }
    },
    [name, setFieldValue, setMaxDate, setMinDate]
  );

  return (
    <FormGroup>
      <Label htmlFor={name}>{label}</Label>
      <div className="input-group">
        <DatePicker
          {...field}
          {...props}
          selected={(value && new Date(value)) || null}
          dateFormat="MM/dd/yyyy"
          onChange={handleChange}
          maxDate={maxDate ? maxDate : new Date()}
          minDate={minDate && minDate}
          peekNextMonth
          showMonthDropdown
          showYearDropdown
          dropdownMode="select"
          className="form-control"
          disabled={isDisabled}
        />
      </div>

      {touched[name] && errors[name] && (
        <div className="error">{errors[name]}</div>
      )}
    </FormGroup>
  );
};

export default PortDate;
