import React, { Fragment, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import {
  Autocomplete,
  Box,
  Container,
  TextField,
  Typography,
} from '@mui/material';
import { useDebouncedCallback } from 'use-debounce';
import Link from './Link';
import { useAuth } from '../hooks/useAuth';
import MUIButton from './UI/MUIButton';
import { listUsers } from '../helpers/fetchers';

export default function Header() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const { logout, auth } = useAuth();
  const [userList, setUserList] = useState<any[]>([]);
  const { pathname, push } = useRouter();

  useEffect(() => {
    const loginPaths = ['/signup', '/login'];
    setIsLoggedIn(!loginPaths.includes(pathname));
  }, [pathname]);

  const handleClick = async () => {
    await logout();
  };

  const debounce = useDebouncedCallback(async (value) => {
    const users = await listUsers({ email: value }, auth?.accessToken);
    setUserList(users);
  }, 200);

  return (
    <Box bgcolor='#eee' mb='1rem' display='flex' justifyContent='center'>
      <Container
        maxWidth='xl'
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <Typography variant='h5' fontWeight={600}>
          TrybeSocial
        </Typography>
        {isLoggedIn ? (
          <Fragment>
            <Autocomplete
              freeSolo
              id='free-solo-2-demo'
              sx={{ width: '400px' }}
              disableClearable
              onInputChange={(event: any) => {
                debounce(event?.target.value);
              }}
              getOptionLabel={({ firstName, email }) => `${firstName}, ${email}`}
              options={userList}
              renderOption={(props: any, option: any) => <Box
                component="li"
                {...props}
                onClick={(event: any) => {
                  push({ pathname: `/user/${event.target.id}` });
                  props.onClick(event);
                }}
                id={option.id}
                >
                {`${option.firstName}, ${option.email}`}
              </Box>}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label='Buscar Usuário'
                  InputProps={{
                    ...params.InputProps,
                    type: 'search',
                  }}
                />
              )}
            />
            <Box my='1rem'>
              <Link href='/jobs'>Vagas</Link>
              <Link href='/profile'>Perfil</Link>
              <Link href='/labs'>Laboratórios</Link>
              <Link href='/chat'>Chat</Link>
              <MUIButton
                bgColor='black'
                sx={{
                  color: 'white',
                  padding: '.4rem 1rem',
                  marginLeft: '1rem',
                }}
                onClick={handleClick}
                size='large'
              >
                logout
              </MUIButton>
            </Box>
          </Fragment>
        ) : (
          <Box my='1rem'>
            <Link href='/login'>Login</Link>
            <Link href='/signup'>Cadastrar</Link>
          </Box>
        )}
      </Container>
    </Box>
  );
}
