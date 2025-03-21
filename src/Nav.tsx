
import { Container, Nav, Navbar, NavbarBrand, NavbarToggle } from 'react-bootstrap'
import { NavLink } from 'react-router-dom'

export default function () {
  return (
    <div>
        <Navbar expand="lg" className="bg-dark" data-bs-theme="dark">
            <Container>
                <NavbarBrand>
                    Recipie App
                </NavbarBrand>
                <NavbarToggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ms-auto">
                        <NavLink to="/" className="m-3">Home</NavLink>
                        <NavLink to="/meal-planner" className="m-3">MealPlanner</NavLink>
                        <NavLink to="/recipes" className="m-3">My Recipes</NavLink>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    </div>
  )
}
