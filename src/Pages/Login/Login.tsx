import { Button, Col, Container, Row, Form, Nav, NavLink } from 'react-bootstrap';
import { useState } from 'react';

import './Login.scss'
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';

import { API, Auth, graphqlOperation } from 'aws-amplify';
import { queries } from '../../graphql/queries';
import { mutations } from '../../graphql/mutations';


export default function Login() {
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


const onSubmit = async (data: any) => {
  console.log(data);
  console.log(getValues('username'));

  // const user = await Auth.signIn(
  //   data.username,
  //   data.password
  // );

  const myProduct = {
    name: 'product ' + new Date().getTime(),
    quility: 90
  }

  // const products = await API.graphql({ query: queries.listProducts });
  // const products = await API.graphql(graphqlOperation(mutations.createProduct, {createproductinput: myProduct }));
  // console.log(products); // result: { "data": { "listTodos": { "items": [/* ..... */] } } }

  const book = {content: "content add from react", price: 10, rating: 1.5, title: "react app graphQL"};
  const bookNews =  await API.graphql(graphqlOperation(mutations.createBook, {input: book }));
  console.log(bookNews);

  // const products = await API.graphql({ query: queries.listBooks });
  // console.log(products); result: { "data": { "listTodos": { "items": [/* ..... */] } } }

  // console.log(user);
  setResult(true)
}

const [result, setResult] = useState(false);
const [showError, setShowError] = useState(false)



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
        {result ? <LoginSuccess /> : <div className="register-form">
          <Form className="login-form" onSubmit={handleSubmit(onSubmit)}>
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

