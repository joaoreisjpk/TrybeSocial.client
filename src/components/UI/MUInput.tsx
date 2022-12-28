import TextField, { TextFieldProps } from '@mui/material/TextField';
import { useField, FieldAttributes } from 'formik';

type MyRadioProps = { label?: string } & FieldAttributes<{}> & TextFieldProps;

function MUInput({ label, sx, ...props }: MyRadioProps) {
  const [field, meta] = useField<{}>(props);
  const errorText: string = meta.error && meta.touched ? meta.error : '';
  return (
    <TextField
      error={!!errorText}
      helperText={errorText}
      variant='outlined'
      color='secondary'
      margin='none'
      id={field.name}
      label={label}
      sx={{
        ...sx,
      }}
      {...field}
      {...props}
    />
  );
}

export default MUInput;
