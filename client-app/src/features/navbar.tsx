import React, { useContext } from 'react'
import { Navbar, Nav, Button, NavDropdown } from 'react-bootstrap';
import { observer } from 'mobx-react-lite';

import { RootStoreContext } from '../app/stores/rootStore';

// @ts-ignore
import { Link } from 'react-router-dom';

const NavBar: React.FC = () => {

    const rootStore = useContext(RootStoreContext);
    const { openCreateForm } = rootStore.activityStore;
    const { user, isLoggedIn } = rootStore.userStore;

    return (
        <Navbar sticky="top" bg="dark" expand="lg">
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
                        style={{ marginRight: '10px' }}
                        as={Link} to='/activities'
                    >
                        Activities
                </Nav.Link>

                    <Button
                        jaj="sdasdasd"
                        variant="success"
                        onClick={openCreateForm}
                        as={Link} to='/createActivity'
                    >
                        Create Activity
                </Button>
                    {
                        isLoggedIn &&
                        <NavDropdown
                            title={
                                <span className="p-0">
                                    <Navbar.Brand href="#home" className="p-0">
                                        <img
                                            src={user!.image || "/assets/user.png"}
                                            width="30"
                                            height="30"
                                            className="d-inline-block align-top p-0"
                                            alt="React Bootstrap logo"
                                        />
                                    </Navbar.Brand>
                                    <span className="text-white">sadhasd</span>
                                </span>
                            }
                            id="collasible-nav-dropdown">
                            <NavDropdown.Item href="#action/3.1" className="text-danger">Action</NavDropdown.Item>
                            <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
                        </NavDropdown>

                    }

                </Nav>
            </Navbar.Collapse>
        </Navbar>
    )
}

export default observer(NavBar);