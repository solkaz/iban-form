import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { nameValidatorGenerator, emailValidator } from "./validators";
import "./App.css";

class App extends React.Component {
  validateFirstName = nameValidatorGenerator("First");
  validateLastName = nameValidatorGenerator("Last");

  render() {
    return (
      <div>
        <h1>Register Account</h1>
        <Formik
          initialValues={{ firstName: "", lastName: "", email: "", iban: "" }}
          onSubmit={async (values, { setSubmitting }) => {
            setTimeout(() => {
              alert(JSON.stringify(values, null, 2));
              setSubmitting(false);
            }, 400);
          }}
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
              <Field type="email" name="email" validate={emailValidator} />
              <ErrorMessage name="email" component="div" />
              <label htmlFor="iban">IBAN</label>
              <Field type="iban" name="iban" />
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
