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
          {({ isSubmitting }) => (
            <Form>
              <Field name="firstName" validate={this.validateFirstName} />
              <ErrorMessage name="firstName" component="div" />
              <Field name="lastName" validate={this.validateLastName} />
              <ErrorMessage name="lastName" component="div" />
              <Field type="email" name="email" validate={emailValidator} />
              <ErrorMessage name="email" component="div" />
              <Field type="iban" name="iban" />
              <ErrorMessage name="iban" component="div" />
              <button type="submit" disabled={isSubmitting}>
                Submit
              </button>
            </Form>
          )}
        </Formik>
      </div>
    );
  }
}

export default App;
