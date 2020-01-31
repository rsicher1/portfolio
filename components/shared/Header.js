import React, { useState, useEffect } from 'react';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  NavbarText,
} from 'reactstrap';

import CustomNavLink from './CustomNavLink';
import Login from './Login';
import Logout from './Logout';

const Header = props => {
  let { isAuthenticated, clientAuth, loading, className } = props;

  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  return (
    <div>
      <Navbar
        className={`port-navbar port-nav-base absolute ${className}`}
        expand="md"
        dark
      >
        <CustomNavLink brand href="/">
          Ross Sicherman
        </CustomNavLink>

        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="mr-auto" navbar></Nav>
          <Nav navbar>
            <NavItem className="port-navbar-item">
              <CustomNavLink href="/about">About</CustomNavLink>
            </NavItem>
            <NavItem className="port-navbar-item">
              <CustomNavLink href="/portfolio">Portfolio</CustomNavLink>
            </NavItem>
            <NavItem className="port-navbar-item">
              <CustomNavLink href="/cv">CV</CustomNavLink>
            </NavItem>
            <NavItem className="port-navbar-item">
              <CustomNavLink href="/blog">Blog</CustomNavLink>
            </NavItem>
            <NavItem className="port-navbar-item">
              <NavLink
                className="port-navbar-link"
                href="https://github.com/rsicher1"
              >
                Github
              </NavLink>
            </NavItem>
            <NavItem className="port-navbar-item">
              {clientAuth && loading && (
                <span className="nav-link port-navbar-link">Loading...</span>
              )}
              {((!clientAuth && isAuthenticated) ||
                (clientAuth && !loading && isAuthenticated)) && <Logout />}
              {((!clientAuth && !isAuthenticated) ||
                (clientAuth && !loading && !isAuthenticated)) && <Login />}
            </NavItem>

            {/*<UncontrolledDropdown nav inNavbar>
              <DropdownToggle nav caret>
                Options
              </DropdownToggle>
              <DropdownMenu right>
                <DropdownItem>Option 1</DropdownItem>
                <DropdownItem>Option 2</DropdownItem>
                <DropdownItem divider />
                <DropdownItem>Reset</DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>*/}
          </Nav>
          {/*<NavbarText>Simple Text</NavbarText>*/}
        </Collapse>
      </Navbar>
    </div>

    /*
    return (
      <Fragment>
        <Link href="/">
          <a>Home</a>
        </Link>

        <Link href="/blog">
          <a>Blog</a>
        </Link>

        <Link href="/portfolio">
          <a>Portfolio</a>
        </Link>

        <Link href="/about">
          <a>About</a>
        </Link>

        <Link href="/cv">
          <a>CV</a>
        </Link>

        {
        <NextRoutesLink route="test" params={{ id: '2' }}>
          <a>Test id: 2</a>
        </NextRoutesLink>

        <NextRoutesLink route="/test/5">
          <a>Test id: 5</a>
        </NextRoutesLink>

        <style jsx>
          {`
            a {
              font-size: 20px;
            }

            .custom-class {
              color: red;
            }
          `}
        </style>
      </Fragment>
      */
  );
};

export default Header;
