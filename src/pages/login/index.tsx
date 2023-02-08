import Head from 'next/head';
import { useState } from 'react';
import { Box, Container, Typography } from '@mui/material';
import { useRouter } from 'next/router';
import Header from '../../components/Header';
import { useAuth } from '../../hooks/useAuth';
import { fetchLogin } from '../../helpers/fetchers';
import { encrypt } from '../../helpers/crypt';
import FormBuilder from '../../components/FormBuilder';

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
  const { setUser, handleUpdateUserAuth } = useAuth();
  const { push } = useRouter();
  const TEN_MIN = 1000 * 60 * 10;

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
    setTimeout(() => handleUpdateUserAuth(user), TEN_MIN);
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
        type: 'btn',
        props: {
          type: 'submit', name: 'login', label: 'Entrar', isLoading,
        },
      },
    ],
  };

  return (
    <div>
      <Head>
        <title>Login - Trybe Social</title>
        <meta name='description' content='Rede social focada nos trybers! Venha auxiliar nesse projeto super desafiador que é criar uma rede social, lá você terá liberdade de adicionar as fetures que quiser, desde que siga o padrão de código!' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <Header />
      <Container>
        <Box my={5}>
          <h1>Faça seu Login</h1>
          <Typography sx={{ fontSize: '3rem', color: 'red' }}>
            O site está inativo porque a amazon é uma sovina desgraçada que só pensa em dinheiro
          </Typography>
          <Typography sx={{ fontSize: '3rem', color: 'blue' }}>
            quando conseguir estancar a sangria ponho no ar novamente
          </Typography>
        </Box>
        <Box maxWidth={'350px'}>
          <FormBuilder
            initialValues={{ email: '', password: '' }}
            formValidation={formValidation}
            onSubmit={handleClick}
            formFields={fieldProps}
          />
        </Box>
        {isIncorrectPassowrd && 'Senha Incorreta'}
      </Container>
    </div>
  );
}
