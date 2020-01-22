import React, { useState, useCallback, useEffect } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { Button, Alert } from 'reactstrap';

import PortInput from '../form/PortInput';
import PortInputNoLabel from '../form/PortInputNoLabel';
import PortDate from '../form/PortDate';

const PortfolioForm = props => {
  const {
    onSavePortfolioItem,
    error,
    edit,
    itemInitialValues,
    itemInitialTouched,
  } = props;

  const [maxDate, setMaxDate] = useState(
    (edit && itemInitialValues && new Date(itemInitialValues.endDate)) || null
  );
  const [minDate, setMinDate] = useState(
    new Date(
      (edit && itemInitialValues && itemInitialValues.startDate) || '1900-01-01'
    )
  );

  const [endDateIsDisabled, setEndDateIsDisabled] = useState(
    itemInitialValues && itemInitialValues.endDateIsDisabled
  );

  const validateInputs = values => {
    const errors = {};

    const fieldEntries = Object.entries(values);

    fieldEntries.forEach(([key, value]) => {
      if (
        !value &&
        !['endDate', 'endDateIsDisabled', 'startDate'].includes(key)
      ) {
        const fieldLabels = key.split(/(?=[A-Z])/);
        const fieldLabel = fieldLabels
          .map(f => f[0].toUpperCase() + f.substr(1))
          .join(' ');

        errors[key] = `${fieldLabel} is required`;
      }
    });

    const { startDate, endDate, endDateIsDisabled } = values;

    // debugger;

    if (!startDate) {
      errors.startDate = `Start Date is required`;
    }

    if (!endDateIsDisabled) {
      if (!endDate) {
        errors.endDate = `End Date is required`;
      }

      if (startDate && endDate && endDate <= startDate) {
        errors.startDate = 'Start date must be before end date';
        errors.endDate = 'End date must be later than start date';
      }
    }
    return errors;
  };

  return (
    <Formik
      initialValues={itemInitialValues}
      initialTouched={itemInitialTouched}
      validate={validateInputs}
      onSubmit={onSavePortfolioItem}
    >
      {({ isSubmitting, isValid }) => (
        <Form>
          {error && <Alert color="danger">{error}</Alert>}
          <Field label="Title" type="text" name="title" component={PortInput} />

          <Field
            label="Company"
            type="text"
            name="company"
            component={PortInput}
          />

          <Field
            label="Location"
            type="text"
            name="location"
            component={PortInput}
          />

          <Field
            label="Position"
            type="text"
            name="position"
            component={PortInput}
          />

          <Field
            label="Description"
            type="textarea"
            name="description"
            component={PortInput}
          />

          <Field
            label="Start Date"
            maxDate={maxDate}
            setMinDate={setMinDate}
            name="startDate"
            component={PortDate}
          />

          <Field
            label="End Date"
            minDate={minDate}
            setMaxDate={setMaxDate}
            name="endDate"
            component={PortDate}
            isDisabled={endDateIsDisabled}
          />

          <Field
            minDate={minDate}
            type="checkbox"
            setMaxDate={setMaxDate}
            name="endDateIsDisabled"
            relatedFieldName="endDate"
            component={PortInputNoLabel}
            setDisabled={setEndDateIsDisabled}
          />

          <Button
            color="success"
            size="lg"
            type="submit"
            disabled={!isValid || isSubmitting}
          >
            {edit ? 'Update' : 'Create'}
          </Button>
        </Form>
      )}
    </Formik>
  );
};

export default PortfolioForm;
