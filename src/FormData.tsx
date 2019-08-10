import React from "react";

const FormData: React.FC<any> = ({ firstName, lastName, email, iban }: any) => {
  return (
    <div>
      <p>First Name: {firstName}</p>
      <p>Last Name: {lastName}</p>
      <p>Email: {email}</p>
      <p>IBAN: {iban}</p>
    </div>
  );
};

export default FormData;
