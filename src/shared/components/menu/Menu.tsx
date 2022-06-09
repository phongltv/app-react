import { Container, Nav, Navbar } from 'react-bootstrap';
import logo from '../../../logo.svg';
import './Menu.scss'

function Menu() {
  return (
    <>
      <Navbar bg="primary" variant="dark">
        <Container>
          <Navbar.Brand href="/"><img src={logo} className="App-logo mlogo" alt="logo" /></Navbar.Brand>
          <Nav className="ml-auto">
            <Nav.Link href="/signIn">SignIn</Nav.Link>
            <Nav.Link href="/signUp">SignUp</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
    </>
  );
}

export default Menu;