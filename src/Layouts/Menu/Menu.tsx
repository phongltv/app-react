import { Container, Nav, Navbar } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import './Menu.scss'

function Menu() {
  const { t } = useTranslation('common');

  return (
    <Container>
        <Nav className="flex-column">
        <Navbar.Brand href="#" className='text-left'>Menu</Navbar.Brand>
        <Nav.Link href="#">{t('common.menu.catagory')}</Nav.Link>
        <Nav.Link href="#">{t('common.menu.product')}</Nav.Link>
        <Nav.Link href="#">{t('common.menu.logout')}</Nav.Link>
      </Nav>
    </Container>
  );
}

export default Menu;