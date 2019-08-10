import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as validators from "./validators";
import "./App.css";

const initialValues = { firstName: "", lastName: "", email: "", iban: "" };

class App extends React.Component {
  validateFirstName = validators.nameValidatorGenerator("First");
  validateLastName = validators.nameValidatorGenerator("Last");

  onSubmit = (values: typeof initialValues) =>
    alert(JSON.stringify(values, null, 2));

  render() {
    return (
      <div>
        <h1>Register Account</h1>
        <Formik
          initialValues={initialValues}
          onSubmit={this.onSubmit}
          validateOnChange={false}
        >
          {({ isSubmitting, isValid }) => (
            <Form>
              <label htmlFor="firstName">First Name</label>
              <Field name="firstName" validate={this.validateFirstName} />
              <ErrorMessage name="firstName" component="div" />

              <label htmlFor="lastName">Last Name</label>
              <Field name="lastName" validate={this.validateLastName} />
              <ErrorMessage name="lastName" component="div" />

              <label htmlFor="email">Email</label>
              <Field type="email" name="email" validate={validators.email} />
              <ErrorMessage name="email" component="div" />

              <label htmlFor="iban">IBAN</label>
              <Field name="iban" validate={validators.IBAN} />
              <ErrorMessage name="iban" component="div" />

              <button type="submit" disabled={isValid || isSubmitting}>
                Submit!
              </button>
            </Form>
          )}
        </Formik>
      </div>
    );
  }
}

export default App;
