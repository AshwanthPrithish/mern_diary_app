import React, { useEffect } from "react";
import { Navbar, Container, Nav, Form, NavDropdown } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../../actions/userActions";

const Header = ({ setSearch }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {}, [userInfo]);

  const logoutHandler = () => {
    dispatch(logout());
    navigate("/");
  };
  return (
    <Navbar bg="dark" expand="lg" variant="dark">
      <Container>
        <Navbar.Brand>
          <Link to="/" style={{ textDecoration: "none" }}>
            SoulScripts
          </Link>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav className="m-auto">
            <Form className="d-flex">
              <Form.Control
                type="search"
                placeholder="Search"
                className="me-2"
                aria-label="Search"
                style={{ margin: "20px" }}
                onChange={(e) => setSearch(e.target.value)}
              />
            </Form>
          </Nav>
          <Nav
            className="my-2 my-lg-0"
            style={{ maxHeight: "100px" }}
            navbarScroll
          >
            {userInfo ? (
              <>
                <Nav.Link>
                  <Link to="/myscripts" style={{ textDecoration: "none" }}>
                    Scripts
                  </Link>
                </Nav.Link>
                <NavDropdown
                  title={`${userInfo.name}`}
                  id="navbarScrollingDropdown"
                >
                  <NavDropdown.Item>
                    <Link to="/profile">About</Link>
                  </NavDropdown.Item>

                  <NavDropdown.Divider />
                  <NavDropdown.Item onClick={logoutHandler}>
                    Logout
                  </NavDropdown.Item>
                </NavDropdown>
              </>
            ) : (
              <Nav.Link>
                <Link to="/login">Login</Link>
              </Nav.Link>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
