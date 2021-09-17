import TextField from '@material-ui/core/TextField';

export default function TextInput({
  type,
  label,
  onChange,
  value,
  error,
  helperText,
  readOnly,
  multiline,
  required,
}) {
  const inputProps = {
    readOnly,
  };
  return (
    <div className="text-field">
      <TextField
        type={type}
        variant="outlined"
        label={label}
        onChange={onChange}
        value={value}
        error={error}
        helperText={helperText}
        inputProps={inputProps}
        multiline={multiline}
        required={required}
      />
    </div>
  );
}
