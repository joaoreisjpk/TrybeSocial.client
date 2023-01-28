import { Dispatch, SetStateAction } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import FormBuilder from './FormBuilder';

interface ModalProps {
  title: string;
  // eslint-disable-next-line no-unused-vars
  onSubmit: (props: any) => void;
  formFields: any
  show: boolean;
  initialValues: any;
  formValidation: any;
  setShow: Dispatch<SetStateAction<boolean>>;
}

/* const levels = ['Júnior', 'Pleno', 'Senior'];
const frameworks = ['Node', 'React', 'Ruby on Rails', 'Vue'];
const languages = ['JavaScript', 'TypeScript'];
 */
export default function TrybeModal(props: ModalProps) {
  function closeDialog() {
    props.setShow(false);
  }

  const formFields = {
    ...props.formFields,
    components: [...props.formFields.components, {
      type: 'btn',
      props: {
        label: 'Cancelar', isLoading: false, onClick: closeDialog, bgColor: '#C0433D',
      },
      sizes: { xs: 12, sm: 6 },
    }],
  };

  return (
    <Dialog open={props.show}>
      <DialogTitle sx={{ fontSize: '2.5rem' }}>{props.title}</DialogTitle>
      <DialogContent>
        <FormBuilder
          initialValues={props.initialValues}
          formValidation={props.formValidation}
          formFields={formFields}
          onSubmit={props.onSubmit}
          isLoading={false}
        />
      </DialogContent>
    </Dialog>
  );
}
