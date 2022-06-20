import { Button, Container, Form, } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import "./Register.scss";
import { useEffect, useRef, useState } from 'react';
import { Auth } from 'aws-amplify';
import LoadingSpinner from '../../Layouts/LoadingSpinner/LoadingSpinner';

function Register() {
  const { Group, Label, Control, Check, Text } = { ...Form }
  const { watch, register, handleSubmit, formState } = useForm();

  const password = useRef();
  const passwordConfirm = useRef();
  password.current = watch('password');
  passwordConfirm.current = watch('passwordConfirm')
  const [isLoading, setIsLoading] = useState(false);
  let navigate = useNavigate();
  const onSubmit = async (data: any) => {
    setIsLoading(true);
    try {
      const { user } = await Auth.signUp(data.email, data.password);
      console.log(user);
      setTimeout(() => {
        setIsLoading(false);
      }, 2000);
      navigate('/verifyEmail', { state: { email: data.email, password: data.password } })
    } catch (error) {
      console.log('error signing up:', error);
    }

    setIsLoading(false);
  }


  return (
    <Container fluid className='d-flex flex-column justify-content-center align-items-center vh-100'>
      {isLoading && <LoadingSpinner />}
      {!isLoading &&
        <Form noValidate onSubmit={handleSubmit(onSubmit)} className="register col-6" validated={formState.isValid}>
          <Text className='header center'>SIGN UP </Text>
          <Group className='mb-3'>
            <Label>User name</Label>
            <Control type="text" placeholder="User name" {...register("userName", {
              required: {
                value: true,
                message: "Please enter User name"
              },
              pattern: {
                value: /^[a-zA-Z0-9]*$/,
                message: "Please enter true format!"
              }
            })}
              isInvalid={formState.errors.userName} />
            <Control.Feedback type="invalid"  >
              {formState.errors?.userName?.message}
            </Control.Feedback>
          </Group>
          <Group className='mb-3'>
            <Label>Email</Label>
            <Control type="text" placeholder="Email" {...register("email", {
              required: {
                value: true,
                message: "required"
              },
              pattern: {
                value: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g,
                message: "Please enter true format!"
              }
            })}
              isInvalid={formState.errors.email} />
            <Control.Feedback type="invalid"  >
              {formState.errors?.email?.message}
            </Control.Feedback>
          </Group>
          <Group className='mb-3'>
            <Label>Password</Label>
            <Control type="password" placeholder="Password" {...register("password", {
              required: {
                value: true,
                message: "Required"
              },
              pattern: {
                value: /^[a-zA-Z0-9]*$/,
                message: "Please enter true format!"
              },
            })}
              isInvalid={formState.errors.password}
            />
            <Control.Feedback type="invalid"  >
              {formState.errors?.password?.message}
            </Control.Feedback>
          </Group>
          <Group className='mb-3'>
            <Label>Confirm Password</Label>
            <Control type="password" placeholder="Password confirm" {...register("passwordConfirm", {
              required: {
                value: true,
                message: "Required"
              },
              pattern: {
                value: /^[a-zA-Z0-9]*$/,
                message: "Please enter true format!"
              },
              validate: {
                isMatchPassword: value => value === password.current || "Password confirm not match"
              }
            })}

              isInvalid={formState.errors.passwordConfirm} />
            <Control.Feedback type="invalid"  >
              {formState.errors?.passwordConfirm?.message}
            </Control.Feedback>
          </Group>
          <Group className="mb-3 d-md-flex gap-2" >
            <Check
              {...register("checkbox", { required: { value: true, message: "Required" } })}
              required
              label={<Label> Agree to terms and conditions <Link to="/signIn">Terms of service</Link></Label>}
              feedback="You must agree before submitting."
              feedbackType="invalid"
              isInvalid={formState.errors.checkbox}
            />
            <Label ></Label>
            <Control.Feedback type="invalid">
              You must agree before submitting.
            </Control.Feedback>
          </Group>

          <Group className="d-flex justify-content-center">
            <Button className="registerButton" type="submit">
              Submit
            </Button>
          </Group>
          <Group className='d-flex justify-content-center gap-2 mt-3'>
            <Label>Do you have an account? </Label>
            <Label ><Link to="/signIn">Login</Link></Label>
          </Group>
        </Form>
      }
    </Container >
  );
}

export default Register;