import React from "react";
import ReactDOM from "react-dom";
import TestRenderer from "react-test-renderer";
import App from "./App";
import { Formik } from "formik";
import { message } from "antd";

describe("App", () => {
  test("has initial state", () => {
    const renderer = TestRenderer.create(<App />);
    const formik = renderer.root.findByType(Formik);
    expect(formik.props.initialValues).toEqual({
      firstName: "",
      lastName: "",
      email: "",
      iban: "",
    });
  });

  test("submitting form validates, posts success message and clears form", async () => {
    const validateForm = jest.fn().mockResolvedValue(true);
    const setValues = jest.fn();
    const setSubmitting = jest.fn();
    jest.spyOn(message, "success");

    const renderer = TestRenderer.create(<App />);
    await renderer.root.findByType(Formik).props.onSubmit({
      setSubmitting,
      setValues,
      validateForm,
    });
    expect(validateForm).toBeCalled();
    expect(message.success).toBeCalledWith("Congratz! All data is valid");
    expect(setValues).toBeCalledWith({
      firstName: "",
      lastName: "",
      email: "",
      iban: "",
    });
    expect(setSubmitting).toBeCalledWith(false);
  });
});
