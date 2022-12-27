import Head from 'next/head';
import { useRouter } from 'next/router';
import { MouseEvent, useState } from 'react';
import Row from 'react-bootstrap/Row';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';

import Header from '../../components/Header';

export default function Login() {
  const { push } = useRouter();
  const [user, setUser] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [turma, setTurma] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleClick = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    const URL = process.env.URL || 'http://localhost:3333';

    const body = JSON.stringify({
      email: user,
      password,
      firstName,
      lastName,
    });

    const response = (await fetch(`${URL}/auth/signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body,
    }).then((data) => data.json())) as { acessToken: string } | any;

    if (response.acessToken) {
      push('/login');
      return;
    }
    alert('usuário já existe');
  };

  return (
    <div>
      <Head>
        <title>Cadastro - Trybe Social</title>
        <meta name='description' content='Generated by create next app' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <Header />
      <Container className='d-flex justify-content-center'>
        <Form className='mt-5 mw-25'>
          <h1 className='mb-4'>Cadastro</h1>
          <Row className='mb-3'>
            <Form.Group as={Col} md='5' controlId='validationCustom01'>
              <Form.Label>Nome</Form.Label>
              <Form.Control
                type='text'
                name='firstName'
                className=''
                value={firstName}
                onChange={({ target }) => setFirstName(target.value)}
                id='firstName'
              />
              <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
            </Form.Group>
            <Form.Group as={Col} md='7' controlId='validationCustom02'>
              <Form.Label>Sobrenome</Form.Label>
              <Form.Control
                type='text'
                name='lastName'
                className=''
                value={lastName}
                onChange={({ target }) => setLastName(target.value)}
                id='lastName'
              />
              <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
            </Form.Group>
          </Row>
          <Row className='mb-3'>
            <Form.Group as={Col} md='8' controlId='validationCustom03'>
              <Form.Label>E-mail</Form.Label>
              <Form.Control
                type='text'
                name='user'
                className=''
                value={user}
                onChange={({ target }) => setUser(target.value)}
                id='user'
              />
              <Form.Control.Feedback type='invalid'>
                Please provide a valid city.
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group as={Col} md='4' controlId='validationCustom03'>
              <Form.Label>Turma</Form.Label>
              <Form.Control
                type='text'
                name='user'
                className=''
                value={turma}
                onChange={({ target }) => setTurma(target.value)}
                id='user'
              />
              <Form.Control.Feedback type='invalid'>
                Please provide a valid city.
              </Form.Control.Feedback>
            </Form.Group>
          </Row>
          <Row className='mb-3'>
            <Form.Group as={Col} md='6' controlId='validationCustom04'>
              <Form.Label>Password</Form.Label>
              <Form.Control
                type='password'
                name='password'
                className=''
                value={password}
                onChange={({ target }) => setPassword(target.value)}
                id='password'
              />
              <Form.Control.Feedback type='invalid'>
                Please provide a valid state.
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group as={Col} md='6' controlId='validationCustom05'>
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control
                type='password'
                name='password'
                className=''
                value={confirmPassword}
                onChange={({ target }) => setConfirmPassword(target.value)}
                id='password'
              />
              <Form.Control.Feedback type='invalid'>
                Please provide a valid zip.
              </Form.Control.Feedback>
            </Form.Group>
          </Row>
          <Form.Group className='mb-3'>
            <Form.Check
              required
              label='Agree to terms and conditions'
              feedback='You must agree before submitting.'
              feedbackType='invalid'
            />
          </Form.Group>
          <Button type='button' onClick={handleClick}>
            Submit form
          </Button>
        </Form>
      </Container>
    </div>
  );
}
