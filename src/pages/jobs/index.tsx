import Head from 'next/head';
import { useEffect, useState } from 'react';

import Grid from '@mui/material/Unstable_Grid2';
import { Box, Container } from '@mui/material';
import { createJob, listJobs } from '../../helpers/fetchers';
import Header from '../../components/Header';
import JobItem from '../../components/JobItem';
import { IJob } from '../../helpers/interfaces';
import TrybeModal from '../../components/TrybeModal';
import MUIButton from '../../components/UI/MUIButton';
import { useAuth } from '../../hooks/useAuth';

interface ModalField {
  title: string
  description: string
  link: string
}

export default function MainPage() {
  const [jobsList, setJobsList] = useState<IJob[]>([]);
  const { user } = useAuth();
  const [isCreateJobModalOpen, setIsCreateJobModalOpen] = useState(false);

  async function getJobList() {
    setJobsList(await listJobs(user?.accessToken));
  }

  async function postNewJob({ title, description, link }: any) {
    setIsCreateJobModalOpen(false);
    await createJob({
      title,
      description,
      link,
    }, user.accessToken);
    await getJobList();
  }

  useEffect(() => {
    getJobList();
  }, [user]);

  if (!user) return <div>Loading...</div>;

  const formFields = {
    globalProps: {
      sizes: { xs: 12 },
    },
    components: [
      { props: { name: 'title', label: 'Título' } },
      { props: { name: 'description', label: 'Descrição' } },
      { props: { name: 'link', label: 'Link da vaga' } },
      {
        type: 'btn',
        props: {
          label: 'Criar Vaga', isLoading: false, type: 'submit',
        },
        sizes: { xs: 12, sm: 6 },
      },
    ],
  };

  function formValidation(signUpData: ModalField) {
    const response = {} as any;
    if (signUpData.title.length < 10) {
      response.title = 'O Título precisa de pelo menos 10 caracteres';
    }
    if (signUpData.description.length < 10) {
      response.description = 'Por favor, descorra uma pequena descrição';
    }
    if (!signUpData.link?.length) {
      response.link = 'O link é obrigatório';
    }

    return response;
  }

  const initialValues = {
    title: '',
    description: '',
    link: '',
  };

  return (
    <div>
      <Head>
        <title>Home - Trybe Social</title>
        <meta name='description' content='Rede social focada nos trybers! Venha auxiliar nesse projeto super desafiador que é criar uma rede social, lá você terá liberdade de adicionar as fetures que quiser, desde que siga o padrão de código!' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <Header />
      <Container maxWidth="xl">
        <Box display="flex" justifyContent="space-between">
          <h1>Vagas</h1>
          <MUIButton onClick={() => setIsCreateJobModalOpen(true)}>
            Adicionar nova Vaga
          </MUIButton>{' '}
        </Box>
        <Grid container spacing={3}>
          {Array.isArray(jobsList) && jobsList.map((data, index) => (
            <Grid xs={12} lg={6} key={JSON.stringify(data) + index}>
              <JobItem data={data} />
            </Grid>
          ))}
        </Grid>
      </Container>

      <TrybeModal
        title='Adicionar nova Vaga'
        onSubmit={postNewJob}
        initialValues={initialValues}
        formValidation={formValidation}
        formFields={formFields}
        show={isCreateJobModalOpen}
        setShow={setIsCreateJobModalOpen}
      />
    </div>
  );
}
