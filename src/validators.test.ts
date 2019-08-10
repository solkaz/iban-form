import * as validators from "./validators";

describe("validators", () => {
  describe.each(["First", "Last"] as const)(
    "%s name",
    (nameType: "First" | "Last") => {
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

      test("accepts valid names", () => {
        expect(validator("Jeff")).toBeUndefined();
        expect(validator("JEFF")).toBeUndefined();
        expect(validator("jeff")).toBeUndefined();
      });
    }
  );

  describe("email", () => {
    test("matches valid email", () => {
      expect(validators.email("a@b.com")).toBeUndefined();
    });
    test("Validates empty string", () => {
      expect(validators.email("")).toBeDefined();
    });
    test("Rejects invalid emails", () => {
      expect(validators.email("a@@b.com")).toBeDefined();
      expect(validators.email("ab")).toBeDefined();
      expect(validators.email("b.com")).toBeDefined();
    });
  });
});
