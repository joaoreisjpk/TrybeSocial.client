import React, { Fragment, useEffect, useState } from 'react';
import {
  Button, Container, Nav, Navbar,
} from 'react-bootstrap';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import Link from './Link';
import { useAuth } from '../hooks/useAuth';

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
    <Navbar bg='dark' variant='dark' expand='lg'>
      <Container className='d-flex justify-content-between'>
        <NextLink href='/main-page' passHref>
          <Navbar.Brand href='#'>TrybeSocial</Navbar.Brand>
        </NextLink>
        <Navbar.Toggle aria-controls='basic-navbar-nav' />
        <Navbar.Collapse id='basic-navbar-nav' className='flex-grow-0'>
          <Nav className='me-auto'>
            {isLoggedIn ? (
              <Fragment>
                <Link href='/main-page'>Home</Link>
                <Link href='/profile'>Perfil</Link>
                <Link href='/labs'>Labs</Link>
                <Button onClick={handleClick}>Logout</Button>
              </Fragment>
            ) : (
              <Fragment>
                <Link href='/login'>Login</Link>
                <Link href='/cadastro'>Cadastrar</Link>
              </Fragment>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
