import React, { useEffect, useState } from "react";
import MainScreen from "../../components/MainScreen/MainScreen";
import { Button, Form } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import Loading from "../../components/Loading";
import ErrorMessage from "../../components/ErrorMessage";
import "./RegisterScreen.css";
import { useDispatch, useSelector } from "react-redux";
import { register } from "../../actions/userActions";

const RegisterScreen = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [pic, setPic] = useState(
    "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2c/Default_pfp.svg/1200px-Default_pfp.svg.png"
  );

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState(null);
  const [picMessage, setPicMessage] = useState(null);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading, error, userInfo } = useSelector(
    (state) => state.userRegister
  );

  useEffect(() => {
    if (userInfo) {
      navigate("/myscripts");
    }
  }, [navigate, userInfo]);

  const submitHandler = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setMessage("Passwords do not match!");
    } else {
      dispatch(register(name, email, password, pic));
    }
  };

  const postDetails = (pics) => {
    if (!pics) {
      return setPicMessage("Please select an image");
    }
    setPicMessage(null);
    if (pics.type === "image/jpeg" || pics.type === "image/png") {
      const data = new FormData();
      data.append("file", pics);
      data.append("upload_preset", "diary-mern"); //w865zcbb
      data.append("cloud_name", "dnb0wwhzt");
      fetch("https://api.cloudinary.com/v1_1/dnb0wwhzt/image/upload", {
        method: "post",
        body: data,
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          setPic(data.url.toString());
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      setPic(null);
      return setPicMessage("Please select Image files only");
    }
  };

  return (
    <div className="main">
      <MainScreen title="Register">
        {error && <ErrorMessage variant="dark">{error}</ErrorMessage>}
        {message && <ErrorMessage variant="dark">{message}</ErrorMessage>}
        {loading && <Loading />}
        <div className="intro-text-reg">
          <Form onSubmit={submitHandler}>
            <Form.Group controlId="name">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="name"
                placeholder="Enter name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              ></Form.Control>
            </Form.Group>
            <br />
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
            <Form.Group controlId="confirmassword">
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Confirm password"
                value={confirmPassword}
                onChange={(p) => setConfirmPassword(p.target.value)}
                required
              ></Form.Control>
            </Form.Group>
            <br />
            {picMessage && <ErrorMessage>{picMessage}</ErrorMessage>}
            <Form.Group controlId="pic">
              <Form.Label>Profile picture</Form.Label>
              <Form.Control
                type="file"
                onChange={(p) => postDetails(p.target.files[0])}
              ></Form.Control>
            </Form.Group>
            <br />
            <Button variant="secondary" type="submit">
              Submit
            </Button>
          </Form>
          <br />
          Already Have an Account?
          <Link
            to="/login"
            style={{ fontStyle: "italic", fontWeight: "lighter" }}
          >
            {" "}
            Login
          </Link>
        </div>
      </MainScreen>
    </div>
  );
};

export default RegisterScreen;
