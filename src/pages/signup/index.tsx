import { Box, Container } from '@mui/material';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useState } from 'react';

import Header from '../../components/Header';
import FormBuilder from '../../components/FormBuilder';
import { useAuth } from '../../hooks/useAuth';
import { fetchSignUp } from '../../helpers/fetchers';

interface ISignUpData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword?: string;
  trybe?: string;
  terms?: boolean | string;
}

function formValidation(signUpData: ISignUpData) {
  const response = {} as ISignUpData;
  if (!signUpData.email.match(/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/)) {
    response.email = 'Email Inválido';
  }
  if (signUpData.firstName.length < 4) {
    response.firstName = 'O Nome precisa ter pelo menos 4 digitos';
  }
  if (signUpData.lastName.length < 4) {
    response.lastName = 'O Sobrenome precisa ter pelo menos 4 digitos';
  }
  if (!signUpData.trybe || signUpData.trybe.length < 4) {
    response.trybe = 'A turma precisa ter pelo menos 4 digitos';
  }
  if (signUpData.password.length <= 5) {
    response.password = 'A senha precisa ter mais que 5 digitos';
  }
  if (signUpData.password !== signUpData.confirmPassword) {
    response.confirmPassword = 'As senhas precisam ser iguais';
  }
  /* if (!signUpData.terms) {
    response.terms = 'É necessário assinar os termos';
  } */

  return response;
}

export default function Login() {
  const { push } = useRouter();
  const { setUser } = useAuth();
  const [isLoading, setIsLoading] = useState(false);

  const handleClick = async (submitData: ISignUpData) => {
    const body = JSON.stringify(submitData);

    setIsLoading(true);
    const { user } = (await fetchSignUp(body)) as any;
    setIsLoading(false);

    if (!user) {
      alert('usuário já existe');
      return;
    }
    setUser(user);
    push('/');
  };

  const initialValues = {
    firstName: '',
    lastName: '',
    email: '',
    trybe: '',
    password: '',
    confirmPassword: '',
    terms: false,
  };

  const formFields = {
    globalProps: {
      sizes: {
        xs: 12,
        sm: 6,
      },
    },
    components: [
      { props: { name: 'firstName', label: 'Nome' } },
      { props: { name: 'lastName', label: 'Sobrenome' } },
      { props: { name: 'email', label: 'E-mail' } },
      { props: { name: 'trybe', label: 'Tribo' } },
      { props: { name: 'password', label: 'Senha', type: 'password' } },
      { props: { name: 'confirmPassword', label: 'Confirmar a Senha', type: 'password' } },
      {
        type: 'checkbox',
        props: { name: 'terms', label: 'Aceitar os Termos' },
      },
      {
        type: 'btn',
        props: { type: 'submit', label: 'Login', isLoading },
      },
    ],
  };

  return (
    <div>
      <Head>
        <title>Cadastro - Trybe Social</title>
        <meta name='description' content='Rede social focada nos trybers! Venha auxiliar nesse projeto super desafiador que é criar uma rede social, lá você terá liberdade de adicionar as fetures que quiser, desde que siga o padrão de código!' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <Header />

      <Container>
        <Box my={5} >
          <h1>Faça seu Cadastro</h1>
        </Box>
        <Box maxWidth={'700px'}>
          <FormBuilder
            initialValues={initialValues}
            formValidation={formValidation}
            onSubmit={handleClick}
            formFields={formFields}
            isLoading={isLoading}
          />
        </Box>
      </Container>
    </div>
  );
}
