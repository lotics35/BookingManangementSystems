import './App.css';
import React from 'react';
import logo from './logo.png';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import 'bootstrap/dist/css/bootstrap.min.css';
import { NavLink } from 'react-router-dom';

const NavMenu = () => {
  return (
    <div className="App">
      <div className='navcontainer'>
        <Navbar className="navbar navbar-expand-lg" bg="" style={{ width: '100%', height: '60px'}}>
          <Container>
            <Navbar.Brand href="/" style={{ marginLeft: '25px', marginRight: '25px', fontSize: '22px', fontFamily: 'Times, Times New Roman, serif', fontStyle: 'oblique'}}> <img src={logo} style={{ width: '40px', height: '40px', marginRight: '5px'}}></img>Chasing Horizons</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="navbar-nav mr-auto">
                <NavLink className="nav-link" to="/"> Home </NavLink>
                <NavLink className="nav-link" to="/List"> List </NavLink>
                <NavLink className="nav-link" to="/About"> About </NavLink>
                <NavLink className="nav-link" to="/contacts"> Contact Us </NavLink>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </div>
    </div>
  );
}

function CustomLink({to, children, ...props}){
  const resolvedPath = useResolvedPath(to)
  const isActive = useMatch({path: resolvedPath.pathname, end: true})
  return(
      <li className={isActive ? "active" : ""}> 
          <Link to={to} {...props}>{children}</Link>
      </li>
  )
}

export default NavMenu;
