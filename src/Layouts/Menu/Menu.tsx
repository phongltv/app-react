import { Container, Nav, Navbar } from 'react-bootstrap';
import logo from '../../logo.svg';
import './Menu.scss';
import { useTranslation } from 'react-i18next';

function Menu() {
  const { t } = useTranslation('web_app');
  return (
    <>
      <Navbar bg="primary" variant="dark">
        <Container>
          <Navbar.Brand href="/"><img src={logo} className="App-logo mlogo" alt="logo" /></Navbar.Brand>
          <Nav className="ml-auto">
            <Nav.Link href="/signIn">{t('web-app.signin')}</Nav.Link>
            <Nav.Link href="/signUp">{t('web-app.signup')}</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
    </>
  );
}

export default Menu;