import Head from 'next/head';
import { useEffect, useState } from 'react';

import { Box, Container } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import { createLab, listLabs } from '../../helpers/fetchers';
import Header from '../../components/Header';
import LabItem from '../../components/LabItem';
import { ILab } from '../../helpers/interfaces';
import TrybeModal from '../../components/TrybeModal';
import MUIButton from '../../components/UI/MUIButton';
import { useAuth } from '../../hooks/useAuth';

export default function Labs() {
  const [labList, setLabList] = useState<ILab[]>([]);
  const [isCreateLabModalOpen, setIsCreateLabModalOpen] = useState(false);
  const { user } = useAuth();

  async function getLabsList() {
    setLabList(await listLabs(user?.accessToken));
  }

  async function postNewLab(params: ILab) {
    setIsCreateLabModalOpen(false);
    await createLab(params, user?.accessToken);
    await getLabsList();
  }

  useEffect(() => {
    getLabsList();
  }, [user]);

  const formFields = {
    globalProps: {
      sizes: { xs: 12 },
    },
    components: [
      { props: { name: 'title', label: 'Título' } },
      { props: { name: 'description', label: 'Descrição' } },
      { props: { name: 'repositoryLink', label: 'Link do Repositório' } },
      { props: { name: 'contactLink', label: 'Link para contato (Linkedin, Instagram...)' } },
      { props: { name: 'contactNumber', label: 'Contato de Celular (Optional)' } },
      {
        type: 'btn',
        props: {
          label: 'Criar Laboratório', isLoading: false, type: 'submit',
        },
        sizes: { xs: 12, sm: 6 },
      },
    ],
  };

  function formValidation(signUpData: ILab) {
    const response = {} as any;
    if (signUpData.title.length < 10) {
      response.title = 'O Título precisa de pelo menos 10 caracteres';
    }
    if (signUpData.description.length < 10) {
      response.description = 'Por favor, descorra uma pequena descrição';
    }
    if (!signUpData.repositoryLink?.length) {
      response.repositoryLink = 'O link do repositório é obrigatório';
    }
    if (!signUpData.contactLink?.length) {
      response.contactLink = 'O link para contato é obrigatório';
    }

    return response;
  }

  const initialValues = {
    title: '',
    description: '',
    repositoryLink: '',
    contactLink: '',
    contactNumber: '',
  };

  if (!user) return <div>Loading...</div>;

  return (
    <div>
      <Head>
        <title>Labs - Trybe Social</title>
        <meta name='description' content='Rede social focada nos trybers! Venha auxiliar nesse projeto super desafiador que é criar uma rede social, lá você terá liberdade de adicionar as fetures que quiser, desde que siga o padrão de código!' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <Header />
      <Container maxWidth="xl">
        <Box display="flex" justifyContent="space-between">
          <h1>Laboratórios</h1>
          <MUIButton onClick={() => setIsCreateLabModalOpen(true)}>Adicionar novo Lab</MUIButton>{' '}
        </Box>

        <Grid container spacing={3}>
          {Array.isArray(labList) && labList.map((data, index) => (
            <Grid xs={12} xl={6} key={JSON.stringify(data) + index}>
              <LabItem data={data} />
            </Grid>
          ))}
        </Grid>
      </Container>

      <TrybeModal
        title='Adicionar novo Laboratório'
        onSubmit={postNewLab}
        show={isCreateLabModalOpen}
        setShow={setIsCreateLabModalOpen}
        formFields={formFields}
        formValidation={formValidation}
        initialValues={initialValues}
      />
    </div>
  );
}
