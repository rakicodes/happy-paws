import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux'
import { logout, reset } from '../features/auth/authSlice'


import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';

const Header = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { user } = useSelector((state) => state.auth)

    const onLogout = () => {
        dispatch(logout());
        dispatch(reset());
        navigate("/")
    }

    return (
        <header>
            <Navbar collapseOnSelect expand="lg" bg="light" variant="light">
                <Container>
                    <Navbar.Brand as={Link} to="/">Happy Paws</Navbar.Brand>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="ms-auto">
                        {
                            user ? 
                            <>
                                <Nav.Link as={Link} to="/profile">Profile</Nav.Link>
                                <Nav.Link as={Link} to="/map">Map</Nav.Link>
                                <Button onClick={onLogout}>Logout</Button>
                            </> : 
                            <>
                                <Nav.Link as={Link} to="/login">Login</Nav.Link>
                                <Nav.Link as={Link} to="/register">Register</Nav.Link>

                            </>
                        }
                    </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </header>
    )
}

export default Header