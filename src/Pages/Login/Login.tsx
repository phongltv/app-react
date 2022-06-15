import { Button, Col, Container, Row, Form, Nav, NavLink } from 'react-bootstrap';
import { useState } from 'react';

import './Login.scss'
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';

import { API, Auth } from 'aws-amplify';
import { signUpWithEmail } from '../../Services/Auth/authentication';
import AWSAppSyncClient, { AUTH_TYPE } from 'aws-appsync';

API.configure({
  "aws_appsync_graphqlEndpoint": "https://p3v4nzgaxvcubnsqksxlljmes4.appsync-api.ap-northeast-1.amazonaws.com/graphql",
  "aws_appsync_region": "ap-northeast-1",
  "aws_appsync_authenticationType": "AMAZON_COGNITO_USER_POOLS",
  "aws_appsync_apiKey": "da2-fxji3dqadzcabearglw5uxgvhi",
})

// const client = new AWSAppSyncClient({
//   url: "https://p3v4nzgaxvcubnsqksxlljmes4.appsync-api.ap-northeast-1.amazonaws.com/graphql",
//   region: "ap-northeast-1",
//   auth: {
//     type: AUTH_TYPE.AMAZON_COGNITO_USER_POOLS,
//     jwtToken: async () => (await Auth.currentSession()).getIdToken().getJwtToken(),
//   },
// });


// const newTodo = await API.graphql({ query: mutations.createTodo, variables: {input: todoDetails}});

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

  // const listProducts = query {
  //   listProducts {
  //     items {
  //       id name quility
  //     }
  //   }
  // }



const onSubmit = async (data: any) => {
  console.log(data);
  console.log(getValues('username'));
  // const user = await Auth.signUp({data.username, data.password,  attributes: { data.username } });

  // const attributes = {email: 'phongn-itsj@hikesiya.co.jp'};
  data = { ...data, email: 'phongn-itsj@hikesiya.co.jp' };

  const user = await Auth.signIn(
    data.username,
    data.password,
    // {email: 'phongn-itsj@hikesiya.co.jp'}
  );


  // const user = signUpWithEmail({
  //   username: data.username,
  //   password: data.password,
  //   attributes: {
  //     email: data.email
  //   }
  // })


  // Simple query
  const products_query = `
  listProducts {
    listProducts {
      items {
        id
        name
        quility
      }
    }
  }
  `
  const products = await API.graphql({ query: products_query });
  console.log(products); // result: { "data": { "listTodos": { "items": [/* ..... */] } } }

  console.log(user);
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

