import Container from '@mui/material/Container';
import Head from 'next/head';
import { Fragment } from 'react';

import Header from '../../components/Header';
import { useAuth } from '../../hooks/useAuth';

export default function MainPage() {
  const { user } = useAuth();

  if (!user) return <div>Loading...</div>;

  return (
    <div>
      <Head>
        <title>Profile - Trybe Social</title>
        <meta name='description' content='Rede social focada nos trybers! Venha auxiliar nesse projeto super desafiador que é criar uma rede social, lá você terá liberdade de adicionar as fetures que quiser, desde que siga o padrão de código!' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <Header />
      <Container maxWidth="xl">
        <h1>Perfil</h1>
        {user && (
          <Fragment>
            <div>
              <h2>Email: {user?.email}</h2>
              <h2>Nome: {user?.firstName}</h2>
              <h2>Sobrenome: {user?.lastName}</h2>
            </div>
          </Fragment>
        )}
      </Container>
    </div>
  );
}
