import React, { useContext, useState } from 'react';
import { Form, Button, Container, Col, InputGroup } from 'react-bootstrap';
import { Formik } from 'formik';
//@ts-ignore
import * as Yup from 'yup';
import { RootStoreContext } from '../../app/stores/rootStore';
import { IuserFormValues } from '../../app/models/user';


// Schema for yup
const validationSchema = Yup.object().shape({
    email: Yup.string()
        .email("*Must be a valid email address")
        .max(100, "*Email must be less than 100 characters")
        .required("*Email is required"),
    password: Yup.string()
        .required("*Password is required"),
});

const LoginForm = () => {

    const rootStore = useContext(RootStoreContext);

    const [ textError, setTextError ] = useState<string>("");

    const { login } = rootStore.userStore;

    return (
        <Container>
            <h1>Login</h1>

            <Formik
                initialValues={{ email: "", password: ""}}
                validationSchema={validationSchema}
                onSubmit={(values : IuserFormValues, { setSubmitting, resetForm }) => {
                    // When Button submits form and form is in the process of submitting, submit Button is disabled
                    setSubmitting(true);
                    setTextError("");
                    //submitting
                    login(values).then(()=>{
                        resetForm();
                        setSubmitting(false);
                    }).catch((err)=>{
                        setTextError(err.statusText);
                    })

                }}
            >
                {({ values,
                    errors,
                    touched,
                    handleChange,
                    handleBlur,
                    handleSubmit,
                    isSubmitting,
                }) => (
                        <Form noValidate onSubmit={handleSubmit} className="mx-auto">
                            
                            <Form.Group controlId="email">
                                <Form.Label>Email :</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="email"
                                    placeholder="Email"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.email}
                                    isInvalid={touched.email && !!errors.email}
                                    isValid={(touched.email && !errors.email)}
                                />
                                <Form.Control.Feedback type="invalid">
                                    {errors.email}
                                </Form.Control.Feedback>
                            </Form.Group>

                            <Form.Group controlId="password">
                                <Form.Label>Password :</Form.Label>
                                <Form.Control
                                    type="password"
                                    name="password"
                                    placeholder="Password"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.password}
                                    isInvalid={touched.password && !!errors.password}
                                    isValid={(touched.password && !errors.password)}
                                />
                                <Form.Control.Feedback type="invalid">
                                    {errors.password}
                                </Form.Control.Feedback>
                            </Form.Group>
                            
                            {
                                textError && <p className="text-danger">{textError}</p>
                            }

                            <Button variant="primary" type="submit" disabled={isSubmitting}>
                                Submit
                            </Button>

                           
                        </Form>
                    )}
            </Formik>

        </Container>
    )
}

export default LoginForm
