import React from 'react';
import { Form, Button, Container, Col, InputGroup } from 'react-bootstrap';
import { Formik } from 'formik';
import { MdDateRange } from "react-icons/md";

//@ts-ignore
import * as Yup from 'yup';

// RegEx for phone number validation
const phoneRegExp = /^(\+?\d{0,4})?\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{4}\)?)?$/

// Schema for yup
const validationSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, "*Names must have at least 2 characters")
    .max(100, "*Names can't be longer than 100 characters")
    .required("*Name is required"),
  email: Yup.string()
    .email("*Must be a valid email address")
    .max(100, "*Email must be less than 100 characters")
    .required("*Email is required"),
  phone: Yup.string()
    .matches(phoneRegExp, "*Phone number is not valid")
    .required("*Phone number required"),
  blog: Yup.string()
    .url("*Must enter URL in http://www.example.com format")
    .required("*URL required"),
  date: Yup.date().required("*Date is required"),
  username: Yup.string().required(),
});

const ContactForm = () => {
  return (
    <Container>
      <h1>Example Formik Form</h1>
      <Formik
        initialValues={{ name: "", email: "", phone: "", blog: "", date: "", username: "" }}
        validationSchema={validationSchema}
        onSubmit={(values, { setSubmitting, resetForm }) => {
          // When Button submits form and form is in the process of submitting, submit Button is disabled
          setSubmitting(true);

          // Simulate submitting to database, shows us values submitted, resets form
          setTimeout(() => {
            alert(JSON.stringify(values, null, 2));
            resetForm();
            setSubmitting(false);
          }, 500);
        }}
      >
        {({ values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
          isSubmitting }) => (
            <Form noValidate onSubmit={handleSubmit} className="mx-auto">
              <Form.Group controlId="formName">
                <Form.Label>Name :</Form.Label>
                <Form.Control
                  type="text"
                  name="name"
                  placeholder="Full Name"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.name}
                  isInvalid={touched.name && !!errors.name}
                  isValid={(touched.name && !errors.name)}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.name}
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group controlId="formUserName">
                <Form.Label>Username :</Form.Label>
                <InputGroup>
                  <InputGroup.Prepend>
                    <InputGroup.Text id="inputGroupPrepend">@</InputGroup.Text>
                  </InputGroup.Prepend>
                  <Form.Control
                    type="text"
                    name="username"
                    placeholder="Username"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.username}
                    isInvalid={touched.username && !!errors.username}
                    isValid={(touched.username && !errors.username)}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.username}
                  </Form.Control.Feedback>
                </InputGroup>
              </Form.Group>


              <Form.Group controlId="formEmail">
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
              <Form.Group controlId="formPhone">
                <Form.Label>Phone :</Form.Label>
                <Form.Control
                  type="text"
                  name="phone"
                  placeholder="Phone"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.phone}
                  isInvalid={touched.phone && !!errors.phone}
                  isValid={(touched.phone && !errors.phone)}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.phone}
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group controlId="formBlog">
                <Form.Label>Blog :</Form.Label>
                <Form.Control
                  type="text"
                  name="blog"
                  placeholder="Blog URL"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.blog}
                  isInvalid={touched.blog && !!errors.blog}
                  isValid={(touched.blog && !errors.blog)}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.blog}
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group controlId="formDate">
                <Form.Label>Date</Form.Label>
                <InputGroup>
                  <Form.Control
                    type="datetime-local"
                    name="date"
                    placeholder="Date"
                    value={values.date}
                    onChange={handleChange}
                    isInvalid={touched.date && !!errors.date}
                    isValid={(touched.date && !errors.date)}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.date}
                  </Form.Control.Feedback>
                  <InputGroup.Append>
                    <InputGroup.Text><MdDateRange /></InputGroup.Text>
                  </InputGroup.Append>
                </InputGroup>
              </Form.Group>

              {/*Submit Button that is disabled after Button is clicked/form is in the process of submitting*/}
              <Button variant="primary" type="submit" disabled={isSubmitting}>
                Submit
          </Button>
            </Form>
          )}
      </Formik>
    </Container>
  );
}

export default ContactForm;