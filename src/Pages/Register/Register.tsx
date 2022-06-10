import { Checkbox } from 'antd';
import { useEffect, useState } from 'react';
import { Button, Container, Form, } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import "./Register.scss";
function Register() {
  type FormData = {
    username: { value: string, error: boolean, message: string }
    email: { value: string, error: boolean, message: string };
    password: { value: string, error: boolean, message: string };
    passwordConfirm: { value: string, error: boolean, message: string };
  };
  const [formValues, setFormValue] = useState({
    username: { value: "", error: false, message: "" },
    email: { value: "", error: false, message: "" },
    password: { value: "", error: false, message: "" },
    passwordConfirm: { value: "", error: false, message: "" }
  } as FormData);
  const [errors, setErrors] = useState({} as FormData);
  const [isSubmited, setIsSubmited] = useState(false);
  const [validated, setValidated] = useState(false)

  const setFieldValue = (field: string, value: any) => {
    setFormValue({
      ...formValues,
      [field]: value
    })
  }
  const handleSubmit = (e: any) => {
    e.preventDefault();
    console.log(e)
    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      setErrors(validate(formValues));

    }
    setIsSubmited(true);
    setValidated(true);
  }
  useEffect(() => {
    console.log(formValues);
    if (Object.keys(formValues).length === 0 && isSubmited) {
      console.log(formValues)
    }
  }, [errors]);

  const validate = (formData: FormData) => {
    const error = {} as FormData;
    let isError = false;
    if (!formData.username.value) {
      formData.username.message = "Username is required"
      formData.username.error = true
    }
    else if (formData.username.value.length < 5) {
      formData.username.message = "Username  < 5"
      formData.username.error = true
    }
    else {
      formData.username.message = ""
      formData.username.error = false
    }

    setValidated(isError);
    return error;
  }

  return (
    <Container fluid className='d-flex flex-column justify-content-center align-items-center vh-100'>
      <Form noValidate className="col-6 register" onSubmit={handleSubmit} validated={validated}>
        <Form.Text className="text-center">
          <h3 className='mb-3' > Sign up</h3> </Form.Text>
        <Form.Group className="mb-3" controlId="userName">
          <Form.Control type="text" placeholder="Enter username"
            onChange={(event) => setFieldValue("username", event.target.value)}
            value={formValues.username.value}
            isInvalid={formValues.username.error && formValues.username.value === ""}

          />
          <Form.Control.Feedback type="invalid" className="error">
            {formValues.username.message}   {!!formValues.username.error}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formEmail">
          <Form.Control className='registerInput' type="email" placeholder="Email"
            onChange={(event) => setFieldValue("email", event.target.value)}


          />
          <Form.Control.Feedback type="invalid" className="error">
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formPassword">
          <Form.Control className='registerInput' type="password" placeholder="Password"
            onChange={(event) => setFieldValue("password", event.target.value)}
            // value={formValues.password}
            // isInvalid={!!errors.password}
            required />
          <Form.Control.Feedback type="invalid">
            {/* {errors.password} */}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formConfirmPassword">
          <Form.Control className='registerInput' type="password" placeholder="Confirm Password"
            onChange={(event) => setFieldValue("passwordConfirm", event.target.value)}
            required />
          <Form.Control.Feedback type="invalid">
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3 d-md-flex gap-2" controlId="formCheckbox">
          <Form.Check
            required
            label="Agree to terms and conditions"
            feedback="You must agree before submitting."
            feedbackType="invalid"
          />
          <Form.Label ><Link to="/signIn">Terms of service</Link></Form.Label>
        </Form.Group>

        <Form.Group className="d-flex justify-content-center">
          <Button className="registerButton" type="submit">
            Submit
          </Button>
        </Form.Group>
      </Form>
    </Container >
  );
}

export default Register;