import React from 'react'
import { Container } from 'react-bootstrap';
//@ts-ignore
import { Link } from 'react-router-dom';

const HomePage = () => {
    return (
        <Container className="mt-3">
            <h1>Home page</h1>
            <h2>Go to <Link to={'/activities'}>Activities</Link></h2>
        </Container>
    )
}

export default HomePage;
