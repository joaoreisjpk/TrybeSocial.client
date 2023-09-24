import Container from '@mui/material/Container';
import Head from 'next/head';

import Header from '../../components/Header';

export default function MainPage() {
  return (
    <div>
      <Head>
        <title>Profile - Trybe Social</title>
        <meta name='description' content='Rede social focada nos trybers! Venha auxiliar nesse projeto super desafiador que é criar uma rede social, lá você terá liberdade de adicionar as fetures que quiser, desde que siga o padrão de código!' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <Header />
      <Container maxWidth="xl">
        Página Errada
      </Container>
    </div>
  );
}
