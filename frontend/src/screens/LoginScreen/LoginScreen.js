import React, { useEffect, useState } from "react";
import MainScreen from "../../components/MainScreen/MainScreen";
import "./LoginScreen.css";
import { Button, Form } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Loading from "../../components/Loading";
import ErrorMessage from "../../components/ErrorMessage";

const LoginScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const userInfo = localStorage.getItem("userInfo");
    if (userInfo) {
      navigate("/myscripts");
    }
  }, []);

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };
      setLoading(true);

      const { data } = await axios.post(
        "/api/users/login",
        { email, password },
        config
      );

      console.log(data);
      localStorage.setItem("userInfo", JSON.stringify(data));
      setLoading(false);
    } catch (error) {
      setError(error.response.data.message);
      setLoading(false);
    }
  };

  return (
    <div className="main">
      <MainScreen title="Login">
        {error && <ErrorMessage variant="dark">{error}</ErrorMessage>}
        {loading && <Loading />}
        <div className="intro-text">
          <Form onSubmit={submitHandler}>
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Email Address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
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
              ></Form.Control>
            </Form.Group>
            <br />
            <Button variant="secondary" type="submit">
              Submit
            </Button>
            <Link to="/signup">
              <Button variant="secondary" style={{ marginLeft: "50px" }}>
                Signup
              </Button>
            </Link>
          </Form>
        </div>
      </MainScreen>
    </div>
  );
};

export default LoginScreen;
