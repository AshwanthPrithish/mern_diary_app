import React from "react";
import MainScreen from "../../components/MainScreen/MainScreen";
import { Col, Row, Form, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ErrorMessage from "../../components/ErrorMessage";
import "./ProfileScreen.css";
import Loading from "../../components/Loading";
import { updateProfile } from "../../actions/userActions";

const ProfileScreen = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [pic, setPic] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [picMessage, setPicMessage] = useState("");

  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const userUpdate = useSelector((state) => state.userUpdate);
  const { loading, error, success } = userUpdate;

  const navigate = useNavigate();
  useEffect(() => {
    if (!userInfo) navigate("/");
    else {
      setName(userInfo.name);
      setEmail(userInfo.email);
      setPic(userInfo.pic);
    }
  }, [navigate, userInfo]);

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

  const submitHandler = (e) => {
    e.preventDefault();

    if (password === confirmPassword)
      dispatch(updateProfile({ name, email, password, pic }));
  };

  return (
    <MainScreen title="Edit profile">
      <div>
        <Row className="profileContainer">
          <Col md={6}>
            {loading && <Loading />}
            {success && (
              <ErrorMessage variant="dark">Updated Successfully</ErrorMessage>
            )}
            {error && <ErrorMessage variant="dark">{error}</ErrorMessage>}
            <Form onSubmit={submitHandler}>
              <Form.Group controlId="name">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="name"
                  placeholder="Enter name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
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
              <Form.Group controlId="confirmassword">
                <Form.Label>Confirm Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Confirm password"
                  value={confirmPassword}
                  onChange={(p) => setConfirmPassword(p.target.value)}
                ></Form.Control>
              </Form.Group>
              <br />
              {picMessage && <ErrorMessage>{picMessage}</ErrorMessage>}
              <Form.Group controlId="pic">
                <Form.Label>Change Profile picture</Form.Label>
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
          </Col>
          <Col
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <img src={pic} alt={name} className="profilePic" />
          </Col>
        </Row>
      </div>
    </MainScreen>
  );
};

export default ProfileScreen;
