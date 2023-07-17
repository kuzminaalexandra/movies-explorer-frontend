import { useState, useCallback } from "react";
import validator from "validator";

export function useForms() {
  const [values, setValues] = useState({});
  const [errors, setErrors] = useState({});
  const [isValid, setIsValid] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    let validationError = "";

    if (name === "email") {
      if (!validator.isEmail(value)) {
        validationError = "Некорректный формат email";
      }
    } else if (name === "password") {
      if (!validator.isLength(value, { min: 8, max: 30 })) {
        validationError = "Пароль должен содержать от 8 до 30 символов";
      }
    } else if (name === "name") {
      if (!validator.isLength(value, { min: 2, max: 30 })) {
        validationError = "Имя должно содержать от 2 до 30 символов";
      }
    }

    setErrors((prevErrors) => ({ ...prevErrors, [name]: validationError }));
    setIsValid(
      Object.values({ ...errors, [name]: validationError }).every(
        (error) => !error
      )
    );
    setValues((prevValues) => ({ ...prevValues, [name]: value }));
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
