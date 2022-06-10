import { Button, Col, Container, Row,Form, ModalHeader, Nav, NavLink, InputGroup} from 'react-bootstrap';
import { CSSProperties, useState } from 'react';

import './Login.scss'


export default function Login() {
  const [validated, setValidated] = useState(false);

  const login = (event:any) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
      console.log('FORM ERROR')
    }

    setValidated(true);
  };


  return (
    <Container>
      <Row>
        <Col className='col-sm-12 col-md-6' style={{"margin":"auto"}}>
        <Form className="login-form" noValidate validated={validated} onSubmit={login} >
   <Form.Text className='header'>SIGN IN </Form.Text>
   <Form.Group  controlId="formUsername" className='mt-2'>
    <Form.Label>Username</Form.Label>
    <Form.Control required
     type="text"
      placeholder="Enter your username or email address" 
      maxLength={20}
      minLength={4}
    />
    <Form.Control.Feedback type="invalid">
             Username 4 characters minimum
            </Form.Control.Feedback>    
  </Form.Group>


  <Form.Group  controlId="formPassword" className='mt-2'>
    <Form.Label>Password</Form.Label>
    <Form.Control 
    required
    minLength={6}
    maxLength={50}
     type="password" 
     placeholder="Enter your password"
      />
    <Form.Control.Feedback type="invalid">
              Password 6 characters minimum
            </Form.Control.Feedback>
  </Form.Group>
  <Button  className='mt-3 sign-in-button' variant="primary" type="submit">
    Submit
  </Button>
  
  <NavLink><Form.Text className="forgot-password-link">Forgot your password?</Form.Text></NavLink>
  <NavLink><Form.Text className="sign-up-link">No account? Sign up for one now</Form.Text></NavLink>
</Form>
        </Col>
      </Row>
    </Container>
   );

}

