import { useState } from "react";
import { formSchema } from "../../formSchema";
import { isFieldVisible } from "../../helpers/isFieldVisible";
import FormField from "./FormField";
import SubmitButton from "./SubmitButton";
import "./DynamicForm.css";

export default function DynamicForm() {
  const [formData, setFormData] = useState({});
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const updateState = (value) => {
    const fieldSchema = formSchema.find((f) => f.name === value.name);
    const newErrors = { ...errors };

    if (value.name === "firstName") {
      if (/\d/.test(value.value)) {
        newErrors.firstName = "Galima įvesti tik raides";
      } else {
        if (newErrors.firstName === "Galima įvesti tik raides") {
          delete newErrors.firstName;
        }
      }
    }

    setErrors(newErrors);

    setFormData((prevData) => ({
      ...prevData,
      [value.name]: value.value,
    }));
  };

  const submitForm = () => {
    setSubmitted(true);

    const newErrors = {};

    formSchema.forEach((field) => {
      // Only validate visible fields
      const visible = isFieldVisible(field, formData);
      if (!visible) return;

      const fieldValue = formData[field.name] || "";

      // Required validation
      if (field.required && fieldValue.trim() === "") {
        newErrors[field.name] = "Šis laukas yra privalomas";
      }

      // Field-specific validation (firstName cannot have numbers)
      if (field.name === "firstName" && /\d/.test(fieldValue)) {
        newErrors.firstName = "Galima įvesti tik raides";
      }
    });

    setErrors(newErrors);
    console.log(newErrors); // For debug

    // If no errors → submit form (visible fields only)
    if (Object.keys(newErrors).length === 0) {
      const visibleFields = formSchema
        .filter((field) => isFieldVisible(field, formData))
        .reduce((acc, field) => {
          acc[field.name] = formData[field.name];
          return acc;
        }, {});

      alert(JSON.stringify(visibleFields, null, 2));
    }
  };

  return (
    <form>
      {formSchema.map((field) =>
        isFieldVisible(field, formData) ? (
          <FormField
            key={field.name}
            field={field}
            value={formData[field.name] || ""}
            onChange={updateState}
            error={submitted ? errors[field.name] : undefined}
          />
        ) : null
      )}

      <SubmitButton onClick={submitForm} />
      <div>
        <p>* - Laukas privalomas</p>
      </div>
    </form>
  );
}
