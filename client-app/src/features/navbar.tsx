import React, { useContext } from 'react'
import { Navbar, Nav,   Button } from 'react-bootstrap';
import { observer } from 'mobx-react-lite';
import ActivityStore from '../app/stores/ActivityStore';

// @ts-ignore
import { Link } from 'react-router-dom';

const NavBar : React.FC = () => {
    
    const activityStore = useContext(ActivityStore);

    return (
        <Navbar bg="dark" expand="lg">
        <Navbar.Brand as={Link} to='/'>
            <img
            src="/assets/logo.png"
            width="30"
            height="30"
            className="d-inline-block align-top"
            alt="l"
            />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
                <Nav.Link 
                    className="text-white" 
                    style={{marginRight:'10px'}}
                    as={Link} to='/activities'
                >
                    Activities
                </Nav.Link>

                <Button 
                    jaj = "sdasdasd"
                    variant="success"
                    onClick={activityStore.openCreateForm}
                    as={Link} to='/createActivity'
                >
                    Create Activity
                </Button>
            </Nav>
        </Navbar.Collapse>
        </Navbar>
    )
}

export default observer(NavBar);