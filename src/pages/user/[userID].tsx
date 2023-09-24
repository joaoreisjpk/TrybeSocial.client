import Container from '@mui/material/Container';
import Head from 'next/head';
import { Fragment, useEffect, useState } from 'react';
import { useRouter } from 'next/router';

import Header from '../../components/Header';
import { useAuth } from '../../hooks/useAuth';
import { getUser } from '../../helpers/fetchers';

export default function MainPage() {
  const { auth } = useAuth();
  const [user, setUser] = useState() as any;
  const router = useRouter();

  async function handleGetUser() {
    const { userID } = router.query;
    const response = userID
      ? await getUser(userID as string, auth?.accessToken)
      : {};
    console.log(response);
    setUser(response);
  }

  async function redirectToChat() {
    router.push(`/chat/${user.id}`);
  }

  useEffect(() => {
    handleGetUser();
  }, [router, auth]);

  if (!user) return <div>Loading...</div>;

  const userData = user?.error ? (
    <div>Usuário não encontrado...</div>
  ) : (
    <div>
      <button onClick={redirectToChat}>Chat</button>
      <h1>
        Perfil de {user?.firstName} {user?.lastName}
      </h1>
      {user && (
        <Fragment>
          <div>
            <h2>Email: {user?.email}</h2>
          </div>
        </Fragment>
      )}
    </div>
  );

  return (
    <div>
      <Head>
        <title>Profile - Trybe Social</title>
        <meta
          name='description'
          content='Rede social focada nos trybers! Venha auxiliar nesse projeto super desafiador que é criar uma rede social, lá você terá liberdade de adicionar as fetures que quiser, desde que siga o padrão de código!'
        />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <Header />
      <Container maxWidth='xl'>{userData}</Container>
    </div>
  );
}
