import { useEffect } from 'react';
import { Button, Container, Form, } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import "./Register.scss";
function Register() {

  const { Group, Label, Control, Check, Text } = { ...Form }
  const { register, handleSubmit, formState, setValue } = useForm();

  // useEffect(() => {
  //   console.log(formState.errors)
  // }, [formState]);

  const onSubmit = (data: any) => {
    console.log(data)

  }
  return (
    <Container fluid className='d-flex flex-column justify-content-center align-items-center vh-100'>
      <Form noValidate onSubmit={handleSubmit(onSubmit)} className="register col-6" validated={formState.isValid}>
        <Text className='header center'>SIGN UP </Text>
        <Group className='mb-3'>
          <Label>User name</Label>
          <Control type="text" placeholder="User name" {...register("userName", {
            required: {
              value: true,
              message: "You must specify your first name before moving forward"
            },
            pattern: {
              value: /^[a-zA-Z]+$/,
              message: "That's not a valid name where I come from..."
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
              message: "That's not a valid name where I come from..."
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
              value: /^[a-zA-Z]+$/,
              message: "That's not a valid name where I come from..."
            }
          })}
            isInvalid={formState.errors.password} />
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
              value: /^[a-zA-Z]+$/,
              message: "That's not a valid name where I come from..."
            },
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
    </Container >
  );
}

export default Register;