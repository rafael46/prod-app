import React, { Component } from "react";
import { Formik, FastField, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Debug } from '../components/Debug';
import LoaderButton from "../components/LoaderButton";
//import "./NewContact.css";
import { API } from "aws-amplify";
// import AddLocation from "../components/AddLocation";
// import { s3Upload } from "../libs/awsLib";

const Fieldset = ({ label, name, ...props }) => (
  <React.Fragment>
    <label htmlFor={name}>{label}</label>
    <FastField name={name} {...props} />
    <ErrorMessage name={name}>
      {msg => <div className="field-error">{msg}</div>}
    </ErrorMessage>
  </React.Fragment>
);

const submit = async values =>{
  // event.preventDefault();
  
  // this.setState({isLoading: true});
  try {
    await createContact(
      {
        // cName: this.state.cName,
        // notes: this.state.notes
        // ...this.state,
        ...values
    });
    // this.props.history.push("/");
  } catch (e) {
    alert(e);
    // this.setState({ isLoading: false });
  }
}

const createContact = (contact) =>{
  console.log(contact)
  return API.post("contacts", "/todos", {
    body: contact
  });
}

const initialValues={
  cName: '',
  phone: '',
  email: '',
  locations: [
    {
      address1: '',
      city: '',
    }
  ]
}

const NewContact = () => (
  <div>
    {/* <h1>Sign Up</h1> */}
    <Formik
      initialValues = {initialValues}
      validationSchema={Yup.object().shape({
        cName: Yup.string().required('Required!'),
        phone: Yup.string().required('Required!'),
        email: Yup.string()
          .email('Invalid email')
          .required('Required!'),
      })}
      onSubmit={values => {
        setTimeout(() => {
          alert(JSON.stringify(values, null, 2));
          submit(values);
        }, 500);
      }}
    >
      {({
        handleSubmit,
        handleReset,
        isSubmitting,
        errors,
        touched,
      }) => (
        <Form>
          <Fieldset
            name="cName"
            label="Contact Name"
            type="text"
            placeholder="jane"
          />
          <Fieldset
            name="phone"
            label="Phone"
            type="text"
            placeholder="(213)"
          />
          <Fieldset
            name="email"
            label="Email"
            placeholder="test@acme.com"
            type="email"
          />

          <button type="reset" className="secondary" onClick={handleReset}>
            Reset
          </button>
          <button type="submit" disable={isSubmitting}>
            Submit
          </button>
          <Debug />
        </Form>
      )}

    </Formik>
     
    
  </div>
);


export default NewContact;
