import { Button, Card, Form, Input, message } from "antd";
import { ErrorMessage, Field, FieldProps, Formik, FormikActions } from "formik";
import React from "react";
import "./App.css";
import * as validators from "./validators";
import FormData from "./FormData";

message.config({
  duration: 3,
});

const initialValues = {
  firstName: "",
  lastName: "",
  email: "",
  iban: "",
} as const;

type Values = typeof initialValues;

const cardStyle = { width: "50%", margin: "0 auto" } as const;

class App extends React.Component {
  validateFirstName = validators.nameValidatorGenerator("First");
  validateLastName = validators.nameValidatorGenerator("Last");

  onSubmit = async ({
    setSubmitting,
    setValues,
    validateForm,
  }: FormikActions<Values>) => {
    await validateForm();
    message.success("Congratz! All data is valid");
    setValues(initialValues);
    setSubmitting(false);
  };

  renderFirstNameInput = ({ field }: FieldProps<any>) => (
    <Input name="firstName" {...field} />
  );

  renderLastNameInput = ({ field }: FieldProps<any>) => (
    <Input name="lastName" {...field} />
  );

  renderEmailInput = ({ field }: FieldProps<any>) => (
    <Input name="email" type="email" {...field} />
  );

  renderIBANInput = ({ field }: FieldProps<any>) => (
    <Input name="iban" {...field} />
  );

  render() {
    return (
      <div className="app">
        <Card style={cardStyle}>
          <h1>Register Account</h1>
          <Formik
            initialValues={initialValues as any}
            onSubmit={this.onSubmit}
            validateOnChange={false}
          >
            {({ isSubmitting, values, handleSubmit }) => (
              <Form layout="vertical" onSubmit={handleSubmit}>
                <Form.Item label="First Name">
                  <Field
                    name="firstName"
                    validate={this.validateFirstName}
                    render={this.renderFirstNameInput}
                  />
                  <ErrorMessage
                    name="firstName"
                    className="error-message"
                    component="div"
                  />
                </Form.Item>

                <Form.Item label="Last Name">
                  <Field
                    name="lastName"
                    validate={this.validateLastName}
                    render={this.renderLastNameInput}
                  />
                  <ErrorMessage
                    name="lastName"
                    className="error-message"
                    component="div"
                  />
                </Form.Item>

                <Form.Item label="Email">
                  <Field
                    name="email"
                    validate={validators.email}
                    render={this.renderEmailInput}
                  />
                  <ErrorMessage
                    name="email"
                    className="error-message"
                    component="div"
                  />
                </Form.Item>

                <Form.Item label="IBAN">
                  <Field
                    name="iban"
                    validate={validators.IBAN}
                    render={this.renderIBANInput}
                  />
                  <ErrorMessage
                    name="iban"
                    className="error-message"
                    component="div"
                  />
                </Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  disabled={isSubmitting}
                >
                  Submit!
                </Button>
                <FormData {...values} />
              </Form>
            )}
          </Formik>
        </Card>
      </div>
    );
  }
}

export default App;
