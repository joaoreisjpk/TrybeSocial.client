import { Dispatch, SetStateAction } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

interface ModalProps {
  title: string
  body: string
  onSubmit: () => void
  show: boolean
  setShow: Dispatch<SetStateAction<boolean>>
}

export default function TrybeModal(props: ModalProps) {
  return (
    <Modal show={props.show} >
      <Modal.Header closeButton>
        <Modal.Title>{props.title}</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <p>{props.body}</p>
      </Modal.Body>

      <Modal.Footer>
        <Button variant="secondary" onClick={() => props.setShow(false)}>Close</Button>
        <Button variant="primary" onClick={props.onSubmit}>Save changes</Button>
      </Modal.Footer>
    </Modal>
  );
}
