import Link from 'next/link';
import { FC } from 'react';
import { Navbar, Nav, Button, Container } from 'react-bootstrap';

import styles from './Navibar.module.css';

const NaviBar: FC = () => {
  return (
    <Navbar fixed="top" bg="light" expand="lg" variant="light">
      <Container>
        <Link href="/" passHref>
          <Navbar.Brand>
            <img
              src="/images/logo.jpg"
              className="d-inline-block align-top"
              alt="logo"
              width="180px"
            />
          </Navbar.Brand>
        </Link>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="mr-auto">
            <Link href="/tenders" passHref>
              <Nav.Link className={styles.link}>Tenders</Nav.Link>
            </Link>
            <Link href="/profile" passHref>
              <Nav.Link className={styles.link}>My Profile</Nav.Link>
            </Link>
            <Link href="/my/tenders" passHref>
              <Nav.Link className={styles.link}>My Tenders</Nav.Link>
            </Link>
            <Link href="/my/proposals" passHref>
              <Nav.Link className={styles.link}>My Proposals</Nav.Link>
            </Link>
          </Nav>
          <Link href="/login">
            <Button as="a" size="sm" href="#SIGNIN" variant="outline-success">
              Sign In
            </Button>
          </Link>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NaviBar;
