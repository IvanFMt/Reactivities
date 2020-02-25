import React from 'react'
import { Navbar, Nav,   Button } from 'react-bootstrap';

interface Iprops{
    openCreateForm : () => void
}

export const NavBar : React.FC<Iprops> = ({ openCreateForm }) => {
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
                    onClick={()=> openCreateForm()}
                >
                    Create Activity
                </Button>
            </Nav>
        </Navbar.Collapse>
        </Navbar>
    )
}
