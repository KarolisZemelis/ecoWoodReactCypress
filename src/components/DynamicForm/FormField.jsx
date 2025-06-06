export default function FormField({ field, value, onChange, error }) {
  if (!field) return null;

  return (
    <div className="form-field">
      <label htmlFor={field.name}>
        {field.label} {field.required ? "*" : ""}
      </label>

      {field.type === "select" ? (
        <select
          id={field.name}
          value={value}
          onChange={(e) =>
            onChange({ name: field.name, value: e.target.value })
          }
          required={field.required}
        >
          <option value="">--Pasirinkti--</option>
          {field.options.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      ) : (
        <input
          type={field.type}
          id={field.name}
          value={value}
          onChange={(e) =>
            onChange({ name: field.name, value: e.target.value })
          }
          required={field.required}
        />
      )}

      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
}
