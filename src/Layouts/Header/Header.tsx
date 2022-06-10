import { Container, Nav, Navbar, NavDropdown } from 'react-bootstrap';
import logo from '../../logo.svg';
import './Header.scss';
import { useTranslation } from 'react-i18next';
import i18n from '../../Config/i18n/i18n';
import { useState } from 'react';

function Header() {
  const { t } = useTranslation('web_app');
  const [lang, setLang] = useState('jp');

  const handleSelect = (eventKey: any) => {
    i18n.changeLanguage(eventKey);
    setLang(eventKey);
  };

  return (
    <>
      <Navbar bg="primary" variant="dark" onSelect={handleSelect}>
        <Container>
          <Navbar.Brand href="/"><img src={logo} className="App-logo mlogo" alt="logo" /></Navbar.Brand>
          <Nav className="ml-auto">
            <Nav.Link href="/signIn">{t('web-app.signin')}</Nav.Link>
            <Nav.Link href="/signUp">{t('web-app.signup')}</Nav.Link>
            <NavDropdown title={lang} id="nav-dropdown">
              <NavDropdown.Item eventKey="en">English</NavDropdown.Item>
              <NavDropdown.Item eventKey="jp">Japan</NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Container>
      </Navbar>
    </>
  );
}

export default Header;