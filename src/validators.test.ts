import * as validators from "./validators";

describe("validators", () => {
  describe.each(["First", "Last"])("%s name", (nameType: "First" | "Last") => {
    const validator = validators.nameValidatorGenerator(nameType);
    test("Validates empty string", () => {
      expect(validator("")).toBeDefined();
    });
    test("Accepts only upper- and lowercase letters", () => {
      expect(validator(" ")).toBeDefined();
      expect(validator("1")).toBeDefined();
      expect(validator("john-jacob")).toBeDefined();
      expect(validator("ab3")).toBeDefined();
      expect(validator("*!ßæcö")).toBeDefined();
    });
  });
});
