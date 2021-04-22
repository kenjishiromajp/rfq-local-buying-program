import * as BS from 'react-bootstrap';

import Logo from '../../../public/logo.svg';

const Navbar = () => {
  return (
    <BS.Navbar bg="light" expand="lg">
      <BS.Navbar.Brand href="#home">
        <Logo />
      </BS.Navbar.Brand>
      <BS.Navbar.Toggle aria-controls="basic-navbar-nav" />
      <BS.Navbar.Collapse id="basic-navbar-nav">
        <BS.Nav className="mr-auto">
          <BS.Nav.Link href="#TENDERS">TENDERS</BS.Nav.Link>
          <BS.Nav.Link href="#PROFILE">PROFILE</BS.Nav.Link>
          <BS.Nav.Link href="#SUBSCRIBE">SUBSCRIBE</BS.Nav.Link>
          <BS.NavDropdown title="MY TENDERS" id="basic-nav-dropdown">
            <BS.NavDropdown.Item href="#action/3.1">
              MANAGE TENDER
            </BS.NavDropdown.Item>
            <BS.NavDropdown.Item href="#action/3.2">
              NEW TENDER
            </BS.NavDropdown.Item>
            <BS.NavDropdown.Item href="#action/3.3">
              Something
            </BS.NavDropdown.Item>
            <BS.NavDropdown.Divider />
            <BS.NavDropdown.Item href="#action/3.4">
              Separated link
            </BS.NavDropdown.Item>
          </BS.NavDropdown>
        </BS.Nav>
        <BS.Form inline="inline">
          <BS.FormControl
            type="text"
            placeholder="Search"
            className="mr-sm-2"
          />
          <BS.Button variant="outline-success">Search</BS.Button>
        </BS.Form>
      </BS.Navbar.Collapse>
    </BS.Navbar>
  );
};

export default Navbar;
