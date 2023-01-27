import Head from 'next/head';
import { useEffect, useState } from 'react';

import { createLab, listLabs } from '../../helpers/fetchers';
import Header from '../../components/Header';
import JobItem from '../../components/JobItem';
import { IJob } from '../../helpers/interfaces';
import TrybeModal from '../../components/TrybeModal';
import MUIButton from '../../components/UI/MUIButton';
import { useAuth } from '../../hooks/useAuth';

export default function Labs() {
  const [LabsList, setLabsList] = useState<IJob[]>([]);
  const [isCreateLabModalOpen, setIsCreateLabModalOpen] = useState(false);
  const { user } = useAuth();

  async function getLabsList() {
    setLabsList(await listLabs(user?.accessToken));
  }

  async function postNewLab() {
    await createLab({ name: '#koeeee negada', link: 'https://www.youtube.com/?gl=BR&hl=pt' }, user?.accessToken);
    await getLabsList();
    setIsCreateLabModalOpen(false);
  }

  useEffect(() => {
    getLabsList();
  }, []);

  if (!user) return <div>Loading...</div>

  return (
    <div>
      <Head>
        <title>Labs - Trybe Social</title>
        <meta name='description' content='Generated by create next app' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <Header />
      <h1>Labs</h1>
      <MUIButton onClick={() => setIsCreateLabModalOpen(true)}>Criar novo Lab</MUIButton>{' '}

      {LabsList.map((data) => <JobItem data={data} key={data.name}/>)}
      <TrybeModal
        title='Criar nova Lab'
        body='Criar novo Labb'
        onSubmit={postNewLab}
        show={isCreateLabModalOpen}
        setShow={setIsCreateLabModalOpen}
      />
    </div>
  );
}
