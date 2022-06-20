import { Container, Nav, Navbar } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import './Menu.scss'
import { API, Auth, graphqlOperation } from 'aws-amplify';
import { useEffect } from 'react';
function Menu() {
  const { t } = useTranslation('common');
  const logOut= async()=>{
    const response=await Auth.signOut()
  try{
    if(response!=null){
      console.log(response)
      localStorage.clear()
      console.log('You are successfully signed out')
  }
  else
      console.log('ERROR')
}
  catch(error:any){
      console.log(error)
  }  
}

  return (
    <Container>
        <Nav className="flex-column">
        <Navbar.Brand href="#" className='text-left'>Menu</Navbar.Brand>
        <Nav.Link href="#">{t('common.menu.catagory')}</Nav.Link>
        <Nav.Link href="/">{t('common.menu.product')}</Nav.Link>
        <Nav.Link onClick={()=>logOut()} href="#" >{t('common.menu.logout')}</Nav.Link>
      </Nav>
    </Container>
  );
}

export default Menu;