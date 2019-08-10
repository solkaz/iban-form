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
        expect(validator("\u{1F46A}")).toBeDefined();
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

  describe("iban", () => {
    beforeEach(() => {
      fetchMock.resetMocks();
    });
    test("rejects if iban is empty", () => {
      expect(validators.IBAN("")).rejects.toBe("IBAN is required");
    });

    test("rejects if unable to validate through the server", async () => {
      fetchMock.mockResponseOnce(JSON.stringify({ valid: true }), {
        status: 400,
      });
      expect(validators.IBAN("3", 3)).rejects.toContain(
        "There was a problem validating your IBAN. Please try again."
      );
    });

    test("rejects if invalid IBAN", async () => {
      fetchMock.mockResponseOnce(JSON.stringify({ valid: false }));
      expect(validators.IBAN("3")).rejects.toContain(
        "Please enter a valid IBAN"
      );
    });

    test("resolves if valid IBAN", async () => {
      fetchMock.mockResponseOnce(JSON.stringify({ valid: true }));
      expect(validators.IBAN("3")).resolves.toBe(undefined);
    });

    test("re-attempts to validate IBAN", async () => {
      fetchMock
        .mockResponseOnce(JSON.stringify({ valid: true }), { status: 400 })
        .mockResponseOnce(JSON.stringify({ valid: true }), { status: 400 })
        .mockResponseOnce(JSON.stringify({ valid: true }), { status: 400 })
        .mockResponseOnce(JSON.stringify({ valid: true }));
      expect(validators.IBAN("3")).resolves.toBe(undefined);
    });
  });
});
