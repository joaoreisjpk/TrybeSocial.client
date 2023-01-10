import Head from 'next/head';
import { useRouter } from 'next/router';
import { GetServerSideProps } from 'next';
import { useState } from 'react';
import { Box, Container } from '@mui/material';
import Header from '../../components/Header';
import { useAuth } from '../../hooks/useAuth';
import { fetchLogin, fetchRefreshToken } from '../../helpers/fetchers';
import JWT, { decrypt, encrypt } from '../../helpers/Encrypt';
import {
  setCookieAt,
  setCookieRt,
  destroyCookie,
  parseCookies,
} from '../../helpers/cookie';
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

const jwt = new JWT();

export default function Login() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const { setEmail } = useAuth();

  const handleClick = async ({ email, password }: IUserInput) => {
    const body = JSON.stringify({
      email,
      password: encrypt(password),
    });

    setIsLoading(true);
    const { acessToken, refreshToken } = await fetchLogin(body);

    if (acessToken && refreshToken) {
      setCookieAt('tokenAt', acessToken);
      setCookieRt('tokenRt', refreshToken);
      const { email: jwtEmail } = jwt.decode(acessToken) as { email: string };
      setEmail(jwtEmail);
      router.push('/home');
      setIsLoading(false);
      return;
    }
    setIsLoading(false);
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
      </Container>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { tokenRt: encryptRt } = parseCookies(ctx);
  const tokenRt = decrypt(encryptRt);

  if (tokenRt) {
    const { userId } = jwt.verify(tokenRt);
    const { acessToken, refreshToken } = await fetchRefreshToken(
      tokenRt,
      userId,
    );

    if (acessToken && refreshToken) {
      setCookieAt('tokenAt', acessToken, ctx);

      setCookieRt('tokenRt', refreshToken, ctx);
      return {
        props: {},
        redirect: {
          destination: '/home',
          permanent: false,
        },
      };
    }
    destroyCookie('tokenRt', ctx);
  }

  return {
    props: {},
  };
};
