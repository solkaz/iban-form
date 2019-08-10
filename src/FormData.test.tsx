import React from "react";
import FormData from "./FormData";
import TestRenderer from "react-test-renderer";

describe("FormData", () => {
  test("Renders form values", () => {
    const testRenderer = TestRenderer.create(
      <FormData
        firstName="John"
        lastName="Smith"
        email="a@b.com"
        iban="a number"
      />
    );
    const paragraphElements = testRenderer.root.findAllByType("p");
    expect(paragraphElements.length).toBe(4);
    expect(paragraphElements.map((el) => el.children[1])).toEqual([
      "John",
      "Smith",
      "a@b.com",
      "a number",
    ]);
  });
});
