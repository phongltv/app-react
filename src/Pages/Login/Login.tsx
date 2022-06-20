import { Button, Col, Container, Row, Form, Nav, NavLink } from 'react-bootstrap';
import { useState } from 'react';
import { useNavigate } from "react-router-dom"
import './Login.scss'
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { API, Auth, graphqlOperation } from 'aws-amplify';
import { queries } from '../../graphql/queries';
import { mutations } from '../../graphql/mutations';
import { AnyObject } from 'yup/lib/types';


export default function Login() {
  const navigate = useNavigate()
  const signIn = Yup.object().shape({
    username: Yup.string()
      .required('Username is required')
      .min(4, 'Username 4 characters minimum')
      .max(30, 'Username must not exceed 15 characters'),
    password: Yup.string()
      .required('Password is required')
      .min(6, 'Password 6 characters minimum')
      .max(25, 'Password must not exceed 25 characters'),

  });

  const validationSchema = signIn;
  const {
    register,
    handleSubmit,
    reset,
    getValues,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: {
      username: '',
      password: ''
    }
  });


  const signInSuccess =async (data:{username:string,password:string},event:any) => {
   try{
    let user = await Auth.signIn(
      data.username,
      data.password
      )
      if(user!=null){
        setResult(true);
        setTimeout(() => navigate('/'), 2000);
      }
     else{
        setShowError(true)
        setErrorMessage('No Cognito user found')
     }

   }
   catch(error:any){
      setShowError(true)
      setErrorMessage(error.toString())
      event.preventDefault()
      event.stopPropagation()
   } 
  }

const [result, setResult] = useState(false);
const [showError, setShowError] = useState(false)
const [errorMessage,setErrorMessage]=useState('')


const LoginSuccess = () => (
  <div className="text-success display-6">
    Success! Welcome {getValues('username')}. Redirecting...
  </div>
)
const ShowError = () => (
  <div className="text-danger" style={{ 'textAlign': 'center', 'fontSize': '19px' }}>
    Login failed! {errorMessage}
  </div>
)

return (
  <Container>
    <Row>
      <Col className='col-sm-12 col-md-6' style={{ "margin": "auto" }}>
        {result ? <LoginSuccess /> : <div className="register-form">
          <Form className="login-form" onSubmit={handleSubmit(signInSuccess)}>
            <Form.Text className='header'>SIGN IN </Form.Text>
            <Form.Group className="form-group">
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="text"
                {...register('username')}
                className={`form-control ${errors.username ? 'is-invalid' : ''}`}
              />
              <Form.Control.Feedback className="invalid-feedback">{errors.username?.message}</Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="form-group mt-3">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                {...register('password')}
                className={`form-control ${errors.password ? 'is-invalid' : ''}`}
              />
              <Form.Control.Feedback className="invalid-feedback">{errors.password?.message}</Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="form-group mt-3" >
              <Button style={{width:'100%'}} type="submit" className="btn btn-primary ">
                Sign In
              </Button>
            </Form.Group>
            <Form.Group>
              <NavLink><Form.Text className="forgot-password-link">Forgot your password?</Form.Text></NavLink>
              <Nav.Link href="/signUp"><Form.Text className="sign-up-link">No account? Sign up now</Form.Text></Nav.Link>
              <Form.Text>{showError ? <ShowError /> : null}</Form.Text>
            </Form.Group>

          </Form>
        </div>

        }
      </Col>
    </Row>
  </Container>

);

}

