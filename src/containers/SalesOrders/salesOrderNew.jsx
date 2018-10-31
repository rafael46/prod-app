import React from "react";
import { Formik, Field, FieldArray,  FastField, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Debug } from '../../components/Debug';

import { API } from "aws-amplify";

const Fieldset = ({ label, name, ...props }) => (
  <React.Fragment>
    <label htmlFor={name}>{label}</label>
    <FastField name={name} {...props} />
    <ErrorMessage name={name}>
      {msg => <div className="field-error">{msg}</div>}
    </ErrorMessage>
  </React.Fragment>
);
const submit = async values => {
  // event.preventDefault();
  // this.setState({isLoading: true});
  try {
    await createSalesOrder(
      {
        ...values
      });
    // this.props.history.push("/");
  } catch (e) {
    alert(e);
    // this.setState({ isLoading: false });
  }
}
const createSalesOrder = (order) =>{
  console.log(order)
  return API.post("salesorders", "/todos", {
    body: order
  });
}

const initialValues ={
  customer: 'KRAMERICA',
  orderType: 'CREDIT',
  paid: 'false',
  status: 'open',
  user: 'me',
  "observer": {
    "email": "hector@vipmarketingla.com",
    "fax": "8885492694",
    "location": "headquarters",
    "name": "Hector Coronel",
    "sms": "2133051386"
  },
  "billTo": {
    "addressLine1": "11152 WALLINGSFORD RD",
    "addressLine2": "SUITE 1R",
    "city": "ROSSMOOR",
    "contactSMS": "2138425036",
    "country": "USA",
    "creditLimitOverride": true,
    "id": "KRAMERICA",
    "mainEmail": "admin@vipmarketingla.com",
    "mainTelephone": "2138425036",
    "name": "KRAMERICA",
    "state": "CA",
    "status": "active",
    "type": "CUSTOMER-VENDOR",
    "zip": "90720"
  },
}

const NewSO = () => (
  <div>
    <p>New SO</p>
    <Formik
      initialValues={initialValues}

      onSubmit={values => {
        setTimeout(() => {
          alert(JSON.stringify(values, null, 2));
          submit(values);
        }, 500);
      }}
    >
      {({values, isSubmitting, handleBlur, handleReset,  errors, touched, setFieldValue}) => (
        <Form>
          <Fieldset
            name="customer"
            label="Customer Name"
            type="text"
            placeholder= "Customer Name"
          />

          <button type="reset" className="secondary" onClick={handleReset}>
            Reset
          </button>
          <button type="submit" disable={isSubmitting}>
            Submit
          </button>
          <Debug />
        </Form>
      )

      }
    </Formik>
  </div>
  
);

export default NewSO;

