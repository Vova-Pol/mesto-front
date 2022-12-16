import React from "react";

export function useForm(inputValues) {
  const [values, setValues] = React.useState(inputValues);

  const handleChange = (evt) => {
    const { name, value } = evt.target;
    setValues({ ...values, [name]: value });
  };

  return { values, handleChange, setValues };
}
