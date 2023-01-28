import { Checkbox, FormControlLabel } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import { Form, Formik } from 'formik';
import MUIButton from './UI/MUIButton';
import MUInput from './UI/MUInput';

export default function FormBuilder({
  initialValues, onSubmit, formValidation, formFields,
}: any) {
  function loadComponent({ type, props }: any) {
    switch (type) {
      case 'checkbox':
        return (
          <FormControlLabel control={<Checkbox name={props.name} />} {...props} />
        );

      case 'btn':
        return (
          <MUIButton
            variant='contained'
            size='large'
            disabled={props.disabled}
            bgColor='#44b365'
            {...props}
            sx={{ width: '100%', height: '3.4rem', ...props?.sx }}
          >
            {props.label}
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
            {formFields?.components?.map((data: any, index: number) => (
              <Grid xs={2}
                {...formFields?.globalProps?.sizes}
                {...data.sizes}
                key={String(data) + index}
              >
                {loadComponent(data)}
              </Grid>
            ))}
          </Grid>
        </Form>
      )}

    </Formik>
  );
}
