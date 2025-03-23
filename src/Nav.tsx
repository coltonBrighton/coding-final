import {
  Container,
  Nav,
  Navbar,
  NavbarBrand,
  NavbarToggle,
  NavItem,
} from "react-bootstrap";
import { NavLink } from "react-router-dom";

export default function () {
  return (
    <div>
      <Navbar expand="lg" bg="secondary" data-bs-theme="dark">
        <NavbarBrand className="ms-5">FlavorForge</NavbarBrand>
        <NavbarToggle aria-controls="basic-navbar-nav" className="me-5" />
        <Container>
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto me-5 nav-tabs">
              <NavItem>
                <NavLink
                  to="/home"
                  className={({ isActive }) =>
                    isActive ? "nav-link active" : "nav-link text-light"
                  }
                >
                  Home
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  to="/meal-planner"
                  className={({ isActive }) =>
                    isActive ? "nav-link active" : "nav-link text-light"
                  }
                >
                  Meal Planner
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  to="/recipes"
                  className={({ isActive }) =>
                    isActive ? "nav-link active" : "nav-link text-light"
                  }
                >
                  My Recipes
                </NavLink>
              </NavItem>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
}
