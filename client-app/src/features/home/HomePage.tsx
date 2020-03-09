import React, { useContext, Fragment } from 'react'
import { Container, Button } from 'react-bootstrap';
//@ts-ignore
import { Link } from 'react-router-dom';
import { RootStoreContext } from '../../app/stores/rootStore';

const HomePage = () => {

    const rootStore = useContext(RootStoreContext);
    const { isLoggedIn, user } = rootStore.userStore;


    return (
        <Container className="mt-3">
            <h1>Home page</h1>
            {
                isLoggedIn ?
                    <Fragment>
                        <h3>Welcome back {user?.displayName}</h3>
                        <h2>Go to <Link to={'/activities'}>Activities</Link></h2>
                    </Fragment>
                    :
                    <Fragment>
                        <Button variant="outline-success" as={Link} to={`/login`}>Login</Button>
                        <Button variant="outline-primary">Register</Button>
                    </Fragment>
            }

        </Container>
    )
}

export default HomePage;
