import React, { useContext } from 'react'
import { Navbar, Nav,   Button } from 'react-bootstrap';
import { observer } from 'mobx-react-lite';
import ActivityStore from '../app/stores/ActivityStore';

const NavBar : React.FC = () => {
    
    const activityStore = useContext(ActivityStore);

    return (
        <Navbar bg="dark" expand="lg">
        <Navbar.Brand href="#home">
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
                <Nav.Link href="#home" className="text-white" style={{marginRight:'10px'}}>Activities</Nav.Link>
                <Button 
                    variant="success"
                    onClick={activityStore.openCreateForm}
                >
                    Create Activity
                </Button>
            </Nav>
        </Navbar.Collapse>
        </Navbar>
    )
}

export default observer(NavBar);