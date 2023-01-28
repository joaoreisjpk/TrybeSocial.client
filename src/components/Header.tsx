import React, { Fragment, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { Box, Container, Typography } from '@mui/material';
import Link from './Link';
import { useAuth } from '../hooks/useAuth';
import MUIButton from './UI/MUIButton';

export default function Header() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const { logout } = useAuth();
  const { pathname } = useRouter();

  useEffect(() => {
    const loginPaths = ['/signup', '/login'];
    setIsLoggedIn(!loginPaths.includes(pathname));
  }, [pathname]);

  const handleClick = async () => {
    await logout();
  };

  return (
    <Box bgcolor='#eee' mb='1rem' display='flex' justifyContent='center'>
      <Container maxWidth="xl" sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant='h5' fontWeight={600}>
          TrybeSocial
        </Typography>
        <Box my="1rem">
          {isLoggedIn ? (
            <Fragment>
              <Link href='/jobs'>Vagas</Link>
              <Link href='/profile'>Perfil</Link>
              <Link href='/labs'>Laboratórios</Link>
              <MUIButton
                bgColor='black'
                sx={{ color: 'white', padding: '.4rem 1rem', marginLeft: '1rem' }}
                onClick={handleClick}
                size="large"
              >
                logout
              </MUIButton>
            </Fragment>
          ) : (
            <Fragment>
              <Link href='/login'>Login</Link>
              <Link href='/signup'>Cadastrar</Link>
            </Fragment>
          )}
        </Box>
      </Container>
    </Box>
  );
}
