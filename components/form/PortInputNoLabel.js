import React, { useState, useCallback, useEffect, Fragment } from 'react';
import DatePicker from 'react-datepicker';
// import moment from 'moment';
import { FormGroup, Label, Input } from 'reactstrap';

import 'react-datepicker/dist/react-datepicker.css';

const PortDate = ({
  label,
  field,
  field: { name, value }, //{ name, value, onChange, onBlur }
  form: { touched, errors, setFieldValue, setFieldTouched }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
  maxDate,
  setMaxDate,
  minDate,
  setMinDate,
  setDisabled,
  relatedFieldName,
  type,
  ...props
}) => {
  const toggleInput = () => {
    setFieldValue(relatedFieldName, '');
    setFieldTouched(relatedFieldName, true);
    setDisabled(!value);
    if (setMaxDate) {
      setMaxDate(new Date());
    } else if (setMinDate) {
      setMinDate(new Date('1900-01-01'));
    }
  };

  return (
    <FormGroup>
      <div className="input-group">
        <Label check style={{ marginLeft: '30px', marginTop: '7px' }}>
          <Label htmlFor={field.name}>{label}</Label>
          <Input type={type} {...field} {...props} onClick={toggleInput} />
          Current
        </Label>
      </div>

      {touched[name] && errors[name] && (
        <div className="error">{errors[name]}</div>
      )}
    </FormGroup>
  );
};

export default PortDate;
