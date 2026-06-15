const FormInput = ({
  label,
  error,
  as = "input",
  children,
  className = "",
  ...props
}) => {
  const Field = as;

  return (
    <label className={`field ${className}`}>
      <span>{label}</span>
      <Field className={error ? "input input-error" : "input"} {...props}>
        {children}
      </Field>
      {error && <small className="field-error">{error}</small>}
    </label>
  );
};

export default FormInput;
