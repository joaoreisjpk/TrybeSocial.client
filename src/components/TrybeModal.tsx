import { Dispatch, SetStateAction } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

interface ModalProps {
  title: string;
  body: string;
  onSubmit: () => void;
  show: boolean;
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

  return (
    <Dialog open={props.show} onBlur={closeDialog}>
      <DialogTitle>{props.title}</DialogTitle>
      <DialogContent>
        <DialogContentText>{props.body}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={closeDialog}>Cancelar</Button>
        <Button onClick={props.onSubmit}>Criar Vaga</Button>
      </DialogActions>
    </Dialog>
  );
}
