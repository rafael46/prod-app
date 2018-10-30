import React from "react";
import { Formik, Field, FieldArray,  FastField, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Debug } from '../components/Debug';

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
    await createContact(
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
  return API.post("contacts", "/todos", {
    body: order
  });
}
