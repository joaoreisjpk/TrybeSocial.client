import Head from 'next/head';
import { useState } from 'react';
import { Box, Container } from '@mui/material';
import { useRouter } from 'next/router';
import Header from '../../components/Header';
import { useAuth } from '../../hooks/useAuth';
import { fetchLogin } from '../../helpers/fetchers';
import { encrypt } from '../../helpers/encrypt';
import FormBuilder from '../../components/UI/FormBuilder';

interface IUserInput {
  email: string;
  password: string;
}

function formValidation({ email, password }: IUserInput) {
  const response = {} as IUserInput;
  if (!email.match(/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/)) {
    response.email = 'Email Inválido';
  }
  if (password.length <= 5) {
    response.password = 'A senha precisa ter mais que 5 digitos';
  }

  return response;
}

export default function Login() {
  const [isLoading, setIsLoading] = useState(false);
  const [isIncorrectPassowrd, setIsIncorrectPassowrd] = useState(false);
  const { setUser } = useAuth();
  const { push } = useRouter();

  const handleClick = async ({ email, password }: IUserInput) => {
    const body = JSON.stringify({
      email,
      password: password ? encrypt(password) : password,
    });

    setIsLoading(true);
    const { user } = await fetchLogin(body);
    setIsLoading(false);

    if (!user) {
      setIsIncorrectPassowrd(true);
      return;
    }

    setUser(user);
    push('/');
  };

  const fieldProps = {
    globalProps: {
      sizes: { xs: 12 },
    },
    components: [
      { props: { name: 'email', label: 'E-mail' } },
      { props: { name: 'password', type: 'password', label: 'Senha' } },
      {
        type: 'submitBtn',
        props: { name: 'login', label: 'Entrar', isLoading },
      },
    ],
  };

  return (
    <div>
      <Head>
        <title>Login - Trybe Social</title>
        <meta name='description' content='Generated by create next app' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <Header />
      <Container>
        <Box my={5}>
          <h1>Faça seu Login</h1>
        </Box>
        <Box maxWidth={'350px'}>
          <FormBuilder
            initialValues={{ email: '', password: '' }}
            validate={formValidation}
            onSubmit={handleClick}
            formFields={fieldProps}
          />
        </Box>
        {isIncorrectPassowrd && 'Senha Incorreta'}
      </Container>
    </div>
  );
}
