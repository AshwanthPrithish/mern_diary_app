import React, { useEffect, useState } from "react";
import MainScreen from "../../components/MainScreen/MainScreen";
import "./LoginScreen.css";
import { Button, Form } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import Loading from "../../components/Loading";
import ErrorMessage from "../../components/ErrorMessage";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../actions/userActions";
const LoginScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const userLogin = useSelector((state) => state.userLogin);

  const { loading, error, userInfo } = userLogin;
  useEffect(() => {
    if (userInfo) {
      navigate("/myscripts");
    }
  }, [navigate, userInfo]);

  const submitHandler = async (e) => {
    e.preventDefault();

    dispatch(login(email, password));
  };

  return (
    <div className="main-log">
      <MainScreen title="Login">
        {error && <ErrorMessage variant="dark">{error}</ErrorMessage>}
        {loading && <Loading />}
        <div className="intro-text-log">
          <Form onSubmit={submitHandler}>
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Email Address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              ></Form.Control>
            </Form.Group>
            <br />
            <Form.Group controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Enter password"
                value={password}
                onChange={(p) => setPassword(p.target.value)}
                required
              ></Form.Control>
            </Form.Group>
            <br />
            <div className="buttonContainer">
              <Button
                variant="secondary"
                type="submit"
                className="landingbutton-log"
              >
                Submit
              </Button>
              <Link to="/signup">
                <Button
                  variant="secondary"
                  className="landingbutton-log"
                  value="signup"
                  style={{
                    ...(window.innerWidth >= 560
                      ? { marginLeft: "15px" }
                      : window.innerWidth <= 560
                      ? { marginTop: "10px" }
                      : {}),
                  }}
                >
                  Signup
                </Button>
              </Link>
            </div>
          </Form>
        </div>
      </MainScreen>
    </div>
  );
};

export default LoginScreen;
