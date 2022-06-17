import { useState } from 'react';
import { Button, Container, Form } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Auth } from 'aws-amplify';
import LoadingSpinner from '../../Layouts/LoadingSpinner/LoadingSpinner';

function VerifyEmail() {
    interface VerifyEmailState {
        email: string;
        password: string;
    }

    const { Group, Label, Control, Text } = { ...Form };
    const { register, handleSubmit, formState } = useForm();

    const location = useLocation();
    const navigate = useNavigate();
    const state = location.state as VerifyEmailState

    const [isLoading, setIsLoading] = useState(false);

    const onSubmit = async (data: any) => {
        setIsLoading(true);
        try {
            const res = await Auth.confirmSignUp(state.email, data.code);
            console.log("AWS response : ", res)
            setTimeout(() => {
                setIsLoading(false);
                navigate('/signIn', { state: { email: state.email, password: state.password } });
            }, 3000);

        } catch (error) {
            setIsLoading(false);
            console.log('error signing up:', error);
        }
    };

    const tryAgaint = () => {
        console.log('hi try again there');
    };

    return (
        <Container fluid className='d-flex flex-column justify-content-center align-items-center vh-100'>
            {isLoading && <LoadingSpinner />}
            {!isLoading && (
                <Form noValidate onSubmit={handleSubmit(onSubmit)} className='register col-4'>
                    <Text className='header center'>Verify your email </Text>
                    <Group className='mb-3 text-center d-flex flex-column'>
                        <Label>We sent verifition code to {'abc'}. </Label>
                        <Label>Please check your inbox and enter the code below {'abc'}. </Label>
                        <Label>*6 digits code </Label>
                    </Group>
                    <Group className='d-flex justify-content-center mb-3'>
                        <Control
                            className='text-center w-75'
                            type='text'
                            placeholder='Enter 6 digits code'
                            maxLength={6}
                            {...register('code', {
                                required: {
                                    value: true,
                                    message: 'You must specify your first name before moving forward',
                                },
                                pattern: {
                                    value: /^[0-9]+$/,
                                    message: "That's not a valid name where I come from...",
                                },
                                maxLength: {
                                    value: 6,
                                    message: 'Please enter 6 digits code',
                                },
                                minLength: {
                                    value: 6,
                                    message: 'Please enter 6 digits code',
                                },
                            })}
                            isInvalid={formState.errors.userName}
                        />
                        <Control.Feedback type='invalid'>{formState.errors?.userName?.message}</Control.Feedback>
                    </Group>

                    <Group className='d-flex justify-content-center '>
                        <Button className='verifyButton' type='submit'>
                            Verify Code
                        </Button>
                    </Group>
                    <Group className='d-flex justify-content-center gap-2 mt-3'>
                        <Label>Didn't receive an email? </Label>
                        <Label>
                            <Link onClick={tryAgaint} to={''}>
                                Try again
                            </Link>
                        </Label>
                    </Group>
                </Form>
            )}
        </Container>
    );
}

export default VerifyEmail;
