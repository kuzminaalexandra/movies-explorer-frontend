import { useState, useCallback } from "react";
import validator from "validator";

export function useForms() {
  const [values, setValues] = useState({});
  const [errors, setErrors] = useState({});
  const [isValid, setIsValid] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setValues((prevValues) => ({ ...prevValues, [name]: value }));

    let validationError = "";

    if (name === "email") {
      if (!validator.isEmail(value)) {
        validationError = "Некорректный формат email";
      }
    }

    setErrors((prevErrors) => ({ ...prevErrors, [name]: validationError }));
    setIsValid(e.target.closest("form").checkValidity());
  };

  const resetForm = useCallback(() => {
    setValues({});
    setErrors({});
    setIsValid(false);
  }, [setValues, setErrors, setIsValid]);

  return {
    values,
    handleChange,
    errors,
    isValid,
    resetForm,
    setValues,
  };
}
