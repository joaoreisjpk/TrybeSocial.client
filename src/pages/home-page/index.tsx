import { GetServerSideProps } from 'next';
import Head from 'next/head';
import { useEffect, useState } from 'react';

import { Button } from 'react-bootstrap';
import { createJob, fetchRefreshToken, listJobs } from '../../helpers/fetchers';
import JWT, { decrypt } from '../../helpers/Encrypt';
import {
  setCookieAt,
  setCookieRt,
  destroyCookie,
  parseCookies,
} from '../../helpers/cookie';
import Header from '../../components/Header';
import JobItem from '../../components/JobItem';
import { IJob } from '../../helpers/interfaces';
import TrybeModal from '../../components/TrybeModal';

export default function MainPage() {
  const [jobsList, setJobsList] = useState<IJob[]>([]);
  const [isCreateJobModalOpen, setIsCreateJobModalOpen] = useState(false);

  async function getJobList() {
    setJobsList(await listJobs());
  }

  async function postNewJob() {
    await createJob({
      name: '#vqv',
      external_link: 'https://www.youtube.com/?gl=BR&hl=pt',
    });
    await getJobList();
    setIsCreateJobModalOpen(false);
  }

  useEffect(() => {
    getJobList();
  }, []);

  return (
    <div>
      <Head>
        <title>Home - Trybe Social</title>
        <meta name='description' content='Generated by create next app' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <Header />
      <h1>Vagas</h1>
      <Button onClick={() => setIsCreateJobModalOpen(true)}>
        Criar nova Vaga
      </Button>{' '}
      {jobsList.map((data) => (
        <JobItem data={data} key={data.name} />
      ))}
      <TrybeModal
        title='Criar nova Vaga'
        body='Criar nova vagaa'
        onSubmit={postNewJob}
        show={isCreateJobModalOpen}
        setShow={setIsCreateJobModalOpen}
      />
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { tokenAt: encryptAt, tokenRt: encryptRt } = parseCookies(ctx);
  let tokenAt = decrypt(encryptAt);
  const tokenRt = decrypt(encryptRt);

  if (!tokenRt) {
    destroyCookie('tokenAt', ctx);
    return {
      props: {},
      redirect: {
        destination: '/login',
        permanent: false,
      },
    };
  }

  const jwt = new JWT();

  if (!tokenAt) {
    const { userId } = jwt.decode(tokenRt);
    const { acessToken, refreshToken } = await fetchRefreshToken(
      tokenRt,
      userId,
    );

    if (acessToken && refreshToken) {
      tokenAt = acessToken;

      setCookieAt('tokenAt', acessToken, ctx);

      setCookieRt('tokenRt', refreshToken, ctx);
    } else {
      destroyCookie('tokenRt', ctx);
      return {
        props: {},
        redirect: {
          destination: '/login',
          permanent: false,
        },
      };
    }
  }

  return {
    props: {},
  };
};
