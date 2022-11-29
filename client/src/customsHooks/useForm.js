import { useState } from "react";

export default function useForm(
  initialFormValues,
//   validOnChange = false,
) {
  const [values, setValues] = useState(initialFormValues);
  const [dateValue, setDateValue] = useState(initialFormValues)

  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
  };

  const handleDateChange = (e) => {
    console.log('Element', e)
    setDateValue({
      ...dateValue, e
    })
    console.log('DateValue', dateValue);
  }

  const resetForm = () => {
    setValues(initialFormValues);
    setErrors({});
  };

  return {
    values,
    dateValue,
    setValues,
    errors,
    setErrors,
    handleInputChange,
    resetForm,
    handleDateChange
  };
}
