import React, { Fragment, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { Box, Typography } from '@mui/material';
import Link from './Link';
import { useAuth } from '../hooks/useAuth';
import MUIButton from './UI/MUIButton';

export default function Header() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const { Logout } = useAuth();
  const { pathname } = useRouter();

  useEffect(() => {
    const loginPaths = ['/cadastro', '/login'];
    setIsLoggedIn(!loginPaths.includes(pathname));
  }, [pathname]);

  const handleClick = async () => {
    await Logout();
  };

  return (
    <Box bgcolor='#eee' mb='1rem' display='flex' justifyContent='center'>
      <Box
        display='flex'
        justifyContent='space-between'
        alignItems='center'
        width='90%'
      >
        <Typography variant='h5' fontWeight={600}>
          TrybeSocial
        </Typography>
        <Box m={'1rem'}>
          {isLoggedIn ? (
            <Fragment>
              <Link href='/home'>Home</Link>
              <Link href='/profile'>Perfil</Link>
              <Link href='/labs'>Labs</Link>
              <MUIButton
                bgColor='black'
                sx={{ color: 'white' }}
                onClick={handleClick}
              >
                Logout
              </MUIButton>
            </Fragment>
          ) : (
            <Fragment>
              <Link href='/login'>Login</Link>
              <Link href='/cadastro'>Cadastrar</Link>
            </Fragment>
          )}
        </Box>
      </Box>
    </Box>
  );
}
