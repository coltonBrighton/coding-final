import {
  Container,
  Nav,
  Navbar,
  NavbarBrand,
  NavbarToggle,
  NavItem,
} from "react-bootstrap"
import { NavLink } from "react-router-dom"

export default function () {
  return (
    <div>
      <Navbar expand="lg" bg="secondary" data-bs-theme="dark">
        <NavbarBrand className="ms-5">FlavorForge</NavbarBrand>
        <NavbarToggle aria-controls="basic-navbar-nav" className="me-5" />
        <Container className="me-5">
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto me-5 nav-pills my-2">
              <NavItem>
                <NavLink
                  to="/home"
                  className={({ isActive }) =>
                    isActive
                      ? "nav-link active bg-info-subtle"
                      : "nav-link text-light"
                  }
                >
                  <div className="mx-3">Home</div>
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  to="/meal-planner"
                  className={({ isActive }) =>
                    isActive
                      ? "nav-link active bg-info-subtle"
                      : "nav-link text-light"
                  }
                >
                  <div className="mx-3">Meal Planner</div>
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  to="/recipes"
                  className={({ isActive }) =>
                    isActive
                      ? "nav-link active bg-info-subtle"
                      : "nav-link text-light"
                  }
                >
                  <div className="mx-3">My Recipes</div>
                </NavLink>
              </NavItem>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  )
}
