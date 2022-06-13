import { Button, Col, Container, Row, Form, ModalHeader, Nav, NavLink, InputGroup } from 'react-bootstrap';
import { CSSProperties, isValidElement, useState } from 'react';

import './Login.scss'
import { Value } from 'sass';
import { Field, Formik, FormikErrors, FormikHelpers, FormikProps, FormikValues, withFormik } from 'formik';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { convertTypeAcquisitionFromJson } from 'typescript';

export default function Login() {
  const signIn=Yup.object().shape({
    username: Yup.string()
    .required('Username is required')
    .min(4, 'Username 4 characters minimum')
    .max(15, 'Username must not exceed 15 characters'),
    password: Yup.string()
      .required('Password is required')
      .min(6, 'Password 6 characters minimum')
      .max(25, 'Password must not exceed 25 characters'),
  })
  const User={
  username:'',
  password:''}

  const validationSchema=signIn
  const {
    register,
    handleSubmit,
    reset,
    getValues,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues:{
      username:User.username,
      password:User.password
    }
  });
  const onSubmit=(data:any)=>{
    console.log(data);
    setResult(true)
  }
  const onError = (errors:any) => {
      if(errors.password&&errors.username){
        alert('Invalid username and password')
        setShowError(true)
      }
      else if(errors.password){
        alert('Invalid password')
        setShowError(true)
      }
      else if(errors.username){
        alert('Invalid username')
        setShowError(true)
      }
    ;
  }
  const[formError,setFormError]=useState(false)
  const [result, setResult] = useState(false)
  const [validated, setValidated] = useState(false);
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [showError, setShowError] = useState(false)
  const [formData, setFormData] = useState({ username: '', password: '' })
  const login = (event: any) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
      setShowError(true)
    }
    else
      setResult(true)
      setValidated(true);
      console.log(formData)
  };
  function handleChange(event: any) {
    const key = event.target.name
    const value = event.target.value
    setFormData({ ...formData, [key]: value })
  }

  const LoginSuccess = () => (
    <div className="text-success display-6">
      Success! Welcome {getValues('username')}
    </div>
  )
  const ShowError = () => (
    <div className="text-danger" style={{ 'textAlign': 'center', 'fontSize': '19px' }}>
      Login failed!
    </div>
  )

  return (
    <Container>
      <Row>
      <Col className='col-sm-12 col-md-6' style={{ "margin": "auto" }}>
        {result? <LoginSuccess />: <div className="register-form">
      <Form className="login-form" onSubmit={handleSubmit(onSubmit, onError)}>
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
          <Button type="submit" className="btn btn-primary">
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

