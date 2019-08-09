const nameRegExp = /[a-zA-Z]+/;

const emailRegExp = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;

export const nameValidatorGenerator = (nameType: "First" | "Last") => (
  value = ""
): string | undefined => {
  if (!value.length) {
    return `${nameType} name is required.`;
  }
  if (!nameRegExp.test(value)) {
    return `${nameType} name must contain only letters and spaces`;
  }
  return undefined;
};

export const emailValidator = (value = "") => {
  if (!value) {
    return "Email is required";
  } else if (!emailRegExp.test(value)) {
    return "Please enter a valid e-mail address";
  }
  return undefined;
};
