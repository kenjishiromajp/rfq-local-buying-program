import Link from 'next/link';
import { FC } from 'react';
import { Navbar, Nav, Button, Container } from 'react-bootstrap';

import cx from 'classnames';

import { useAuth } from 'contexts/authContext';

import styles from './Navibar.module.scss';

const NaviBar: FC = () => {
  const { user, logout } = useAuth();
  return (
    <Navbar
      fixed="top"
      bg="light"
      expand="lg"
      variant="dark"
      className={cx('bg-dark-grey', styles.navbar)}
    >
      <Container>
        <Link href="/" passHref>
          <Navbar.Brand>
            <img
              src="/imgs/logoLBP.svg"
              className="d-inline-block align-top"
              alt="logo"
              width="120px"
            />
          </Navbar.Brand>
        </Link>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="mr-auto">
            <Link href="/tenders" passHref>
              <Nav.Link className={styles.link}>Tenders</Nav.Link>
            </Link>
            {user && (
              <Link href="/profile" passHref>
                <Nav.Link className={styles.link}>My Profile</Nav.Link>
              </Link>
            )}
            {user?.Buyer_ID && (
              <Link href="/my/tenders" passHref>
                <Nav.Link className={styles.link}>My Tenders</Nav.Link>
              </Link>
            )}
            {user?.Supplier_ID && (
              <Link href="/my/proposals" passHref>
                <Nav.Link className={styles.link}>My Proposals</Nav.Link>
              </Link>
            )}
          </Nav>
          {user ? (
            <div className="d-flex align-items-center">
              <span className="mr-2 text-white">{user.Email}</span>
              <Button size="sm" variant="link" onClick={() => logout()}>
                Logout
              </Button>
            </div>
          ) : (
            <Link href="/login">
              <Button as="a" size="sm" href="#SIGNIN" variant="outline-white">
                Sign In
              </Button>
            </Link>
          )}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NaviBar;
