// Tests if a character is alphabetic.
const alphabeticCharacterRegExp = /[a-zA-Z]/;

// Matches valid email addresses.
const emailRegExp = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;

/**
 * Determines if a single character is an alphabetic character.
 *
 * @param char the character to examine
 * @returns whether `char` is an alphabetic character or not.
 */
function isAlphabeticCharacter(char: string): boolean {
  return alphabeticCharacterRegExp.test(char);
}

/**
 * Generates a function to validate the first or last name of a person.
 * The only difference between the two fields are the error messages printed;
 * thus, the generated function will apply the same rules to both fields and
 * correctly print a relevant error message.
 * @param nameType Whether the first or last name is being checked.
 * @returns An error message as a string if the name is invalid; undefined if it is valid.
 */
export const nameValidatorGenerator = (nameType: "First" | "Last") => (
  value: string
): string | undefined => {
  if (!value.trim().length) {
    return `${nameType} name is required.`;
  }
  if (!Array.from(value).every(isAlphabeticCharacter)) {
    return `${nameType} name must contain only letters`;
  }
  return undefined;
};

/**
 *
 * @param value the email address to validate
 * @returns An error message as a string if the name is invalid; undefined if it is valid.
 */
export const email = (value: string) => {
  if (!value.trim().length) {
    return "Email is required";
  } else if (!emailRegExp.test(value)) {
    return "Please enter a valid e-mail address";
  }
  return undefined;
};

// URL used to validate IBANs.
const apiUrl = "http://0.0.0.0:3050";

// Headers to be used when validating IBAN
const headers = {
  // This header allows the server to parse the body correctly;
  // otherwise, it will parse the body as an empty object
  "Content-Type": "application/json",
} as const;

/**
 * Asynchronous validator function for Formik to validate IBANs. Because the
 * server is unstable, this function will make up to 3 attempts to validate
 * the IBAN (by calling this function again with an incremented `attemptCount` value)
 * before giving up.
 * @param iban the IBAN to validate
 * @param attemptCount the current number of attempts made to validate `iban`.
 * @returns A Promise that will throw a string as an error message if the IBAN is invalid.
 */
export const IBAN = async (iban: string, attemptCount = 0): Promise<void> => {
  if (!iban.trim().length) {
    throw "IBAN is required";
  }

  return await fetch(apiUrl, {
    method: "POST",
    headers,
    body: JSON.stringify({ iban }),
  }).then(async (res) => {
    if (!res.ok) {
      if (attemptCount < 3) {
        return IBAN(iban, attemptCount + 1);
      }
      throw "There was a problem validating your IBAN. Please try again.";
    } else if (!(await res.json()).valid) {
      throw "Please enter a valid IBAN";
    }
  });
};
