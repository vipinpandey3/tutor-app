import React, { useEffect, useState } from "react";

export default function useForm(
  initialFormValues,
//   validOnChange = false,
) {
  const [values, setValues] = useState(initialFormValues);

  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });

    // if (validOnChange) {
    //   // validate({ [name]: value });
    // }
  };

  const resetForm = () => {
    setValues(initialFormValues);
    setErrors({});
  };

  return {
    values,
    setValues,
    errors,
    setErrors,
    handleInputChange,
    resetForm,
  };
}
