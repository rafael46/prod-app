import React from "react";
import { Formik, Field, FieldArray,  FastField, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Debug } from '../../components/Debug';

import { API } from "aws-amplify";
import customers from '../../data/customers.json';

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
  
  "observer": {
    "email": "hector@vipmarketingla.com",
    "name": "Hector Coronel",
  },

  billTo: {
    addressLine1: "11152 WALLINGSFORD RD",
    addressLine2: "SUITE 1R",
    city: "ROSSMOOR",
    mainEmail: "admin@vipmarketingla.com",
    mainTelephone: "2138425036",
    name: "KRAMERICA",
    state: "CA",
    type: "CUSTOMER-VENDOR",
    zip: "90720"
  },
  lineItems:[
    {
      commodity: "bananas",
      cost: 12,
      description: "PLANTAIN BANANAS FRESH",
      label: "FRESH",
      lineNo: 0,
      lotID: "3101",
      lotNo: "",
      origin: "US",
      price: 4,
      qty: 2,
      size: "-",
      sku: "ban101",
      lotsItemList:[
        {
          lotID: "3101",
          lotNo: "12621-1",
          minimumPrice: 2,
          origin: "US",
          qty: 2,
          sku: "ban101",
        }
        
      ],

    }
  ],
  notes: "-",
  reference: "-",
  user: {
    "email": "rafael@vipmarketingla.com",
    "name": "Rafael",
    "sms": "2135050000"
  }
}
const Custom = () => (
  <React.Fragment>
    <ul>
      {customers.map(customer => <li>{customer.name}</li>)}
    </ul>
  </React.Fragment>
)


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
          <Fieldset
            name="user.name"
            label="Employee"
            type="text"
            placeholder= "Employee Name"
          />
          <FieldArray name lineItems>
            {({push, remove}) => (
              <React.Fragment>
                {values.lineItems && 
                values.lineItems.length >0 &&
                values.lineItems.map((lineItem, index) => (
                  <div className="row">
                    <div className="col">
                    <Field name={`lineItems[${index}].lineNo`} >
                      {({ field, form }) => (
                            <input
                              {...field}
                              type="text"
                              placeholder="lineNo"
                              value={index+1}
                            />
                          )}

                      </Field>
                      <Field name={`lineItems[${index}].lotNo`} >
                      {({ field, form }) => (
                            <input
                              {...field}
                              type="text"
                              placeholder="lotno"
                            />
                          )}
                      </Field>
                      <Field name={`lineItems[${index}].commodity`} >
                      {({ field, form }) => (
                            <input
                              {...field}
                              type="text"
                              placeholder="lotno"
                            />
                          )}
                      </Field>
                      <Field name={`lineItems[${index}].qty`} >
                      {({ field, form }) => (
                            <input
                              {...field}
                              type="text"
                              placeholder="qty"
                            />
                          )}
                      </Field>
                      <Field name={`lineItems[${index}].price`} >
                      {({ field, form }) => (
                            <input
                              {...field}
                              type="text"
                              placeholder="price"
                            />
                          )}
                      </Field>
                      <Field name={`lineItems[${index}].description`} >
                      {({ field, form }) => (
                            <input
                              {...field}
                              type="text"
                              placeholder="description"
                            />
                          )}
                      </Field>
                    </div>
                  </div>
                ))

                }
              </React.Fragment>
            )}

          </FieldArray>
          <br></br>
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

