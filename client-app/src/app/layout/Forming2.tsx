import React from 'react';
import { Form, Button, Container, Col, InputGroup } from 'react-bootstrap';
import { Formik } from 'formik';
//@ts-ignore
import * as yup from 'yup';

// RegEx for phone number validation
const phoneRegExp = /^(\+?\d{0,4})?\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{4}\)?)?$/

// Schema for yup
// const validationSchema = Yup.object().shape({
//   name: Yup.string()
//     .min(2, "*Names must have at least 2 characters")
//     .max(100, "*Names can't be longer than 100 characters")
//     .required("*Name is required"),
//   email: Yup.string()
//     .email("*Must be a valid email address")
//     .max(100, "*Email must be less than 100 characters")
//     .required("*Email is required"),
//   phone: Yup.string()
//     .matches(phoneRegExp, "*Phone number is not valid")
//     .required("*Phone number required"),
//   blog: Yup.string()
//     .url("*Must enter URL in http://www.example.com format")
//     .required("*URL required")
// });

const schema = yup.object({
    firstName: yup.string()
        .min(2, "*Names must have at least 2 characters")
        .max(10, "*Names can't be longer than 10 characters")
        .required("First name is required"),
    lastName: yup.string()
        .min(2, "*Names must have at least 2 characters")
        .max(10, "*Names can't be longer than 10 characters")
        .required("Last name is required"),
    email: yup.string()
        .email("*Must be a valid email address")
        .max(100, "*Email must be less than 100 characters")
        .required("*Email is required"),
    phone: yup.string()
        .matches(phoneRegExp, "*Phone number is not valid")
        .required("*Phone number required"),
});

const Forming2 = () => {
    return (
        <Formik
            validationSchema={schema}
            onSubmit={(values, {setSubmitting, resetForm}) => {
                // When Button submits form and form is in the process of submitting, submit Button is disabled
                setSubmitting(true);
      
                // Simulate submitting to database, shows us values submitted, resets form
                setTimeout(() => {
                  alert(JSON.stringify(values, null, 2));
                  resetForm();
                  setSubmitting(false);
                }, 500);
            }}
            initialValues={{
                firstName: '',
                lastName: '',
                email:'',
                phone:'',
                date:'',
            }}
        >
            {({
                handleSubmit,
                handleChange,
                handleBlur,
                values,
                touched,
                errors,
            }) => (
                    <Form noValidate onSubmit={handleSubmit}>

                        <Form.Group as={Col} md="4" controlId="validationFormik01">
                            <Form.Label>First name</Form.Label>
                            <Form.Control
                                type="text"
                                name="firstName"
                                placeholder="First Name"
                                value={values.firstName}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                isValid={(touched.firstName && !errors.firstName)}
                            />
                            <Form.Control.Feedback type="invalid">
                                {errors.firstName}
                            </Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group as={Col} md="4" controlId="validationFormik02">
                            <Form.Label>Last name</Form.Label>
                            <Form.Control
                                type="text"
                                name="lastName"
                                placeholder="Last name"
                                value={values.lastName}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                isValid={touched.lastName && !errors.lastName}
                            />
                            <Form.Control.Feedback type="invalid">
                                {errors.lastName}
                            </Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group as={Col} md="4" controlId="validationFormik03">
                            <Form.Label>Email</Form.Label>
                            <Form.Control
                                type="text"
                                name="email"
                                placeholder="Email"
                                value={values.email}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                isInvalid={!!errors.email}
                                isValid={(touched.email && !errors.email)}
                            />
                            <Form.Control.Feedback type="invalid">
                                {errors.email}
                            </Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group as={Col} md="4" controlId="validationFormik04">
                            <Form.Label>Phone</Form.Label>
                            <Form.Control
                                type="text"
                                name="phone"
                                placeholder="Phone"
                                value={values.phone}
                                onChange={handleChange}
                                isInvalid={!!errors.phone}
                                isValid={(touched.phone && !errors.phone)}
                            />
                            <Form.Control.Feedback type="invalid">
                                {errors.phone}
                            </Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group as={Col} md="4" controlId="validationFormik04">
                            <Form.Label>Date</Form.Label>
                            <Form.Control
                                type="date"
                                name="date"
                                placeholder="Date"
                                value={values.date}
                                onChange={handleChange}
                                isInvalid={!!errors.date}
                                isValid={(touched.date && !errors.date)}
                            />
                            <Form.Control.Feedback type="invalid">
                                {errors.date}
                            </Form.Control.Feedback>
                        </Form.Group>

                        <Button type="submit">Submit form</Button>
                    </Form>
                )}
        </Formik>
    );
}

export default Forming2;