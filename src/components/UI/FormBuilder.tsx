import { Checkbox, CircularProgress, FormControlLabel } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import { Form, Formik } from 'formik';
import MUIButton from './MUIButton';
import MUInput from './MUInput';

export default function FormBuilder({
  initialValues, onSubmit, formValidation, formFields,
}: any) {
  function loadComponent({ type, props }: any) {
    switch (type) {
      case 'checkbox':
        return (
          <FormControlLabel control={<Checkbox name={props.name} />} {...props} />
        );

      case 'submitBtn':
        return (
          <MUIButton
            type='submit'
            variant='contained'
            size='large'
            disabled={props.disabled}
            bgColor='#44b365'
            {...props}
            sx={{ width: '100%', height: '3.4rem', ...props?.sx }}
    >
            {false ? <CircularProgress /> : props.label}
          </MUIButton>
        );
      default:
        return <MUInput sx={{ width: '100%' }} {...props} />;
    }
  }

  return (
    <Formik
      initialValues={initialValues}
      validate={formValidation}
      onSubmit={onSubmit}
      >
      {() => (
        <Form>
          <Grid container spacing={formFields?.globalProps?.spacing || 2} alignItems="center" justifyContent="center">
            {formFields?.components?.map((data: any) => (
              <Grid xs={2} {...formFields?.globalProps?.sizes} key={data.props.name}>
                {loadComponent(data)}
              </Grid>
            ))}
          </Grid>
        </Form>
      )}

    </Formik>
  );
}
