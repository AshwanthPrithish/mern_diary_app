import React from "react";
import { Link } from "react-router-dom";
import { Button, Container, Row } from "react-bootstrap";
import "./LandingPage.css";
import { useNavigate, useEffect } from "react";

const LandingPage = () => {
  // const navigate = useNavigate();

  // useEffect(() => {
  //   const userInfo = localStorage.getItem("userInfo");
  //   if (userInfo) {
  //     navigate("/myscripts");
  //   }
  // }, [navigate]);
  return (
    <div className="main">
      <Container>
        <Row>
          <div className="intro-text-land">
            <div>
              <h1 className="title">The Realm of Souls Welcomes you!</h1>
              <p className="subtitle">
                Unleash your words. Explore a captivating online diary
                experience. Share, reflect, connect. Welcome to your
                storytelling sanctuary.
              </p>
            </div>
            <div className="buttonContainer">
              <Link to="/login">
                <Button
                  size="lg"
                  className="landingbutton"
                  style={{ marginRight: "30px" }}
                  variant="secondary"
                >
                  Login
                </Button>
              </Link>
              <Link to="/signup">
                <Button
                  size="lg"
                  className="landingbutton"
                  style={{ marginLeft: "30px" }}
                  variant="secondary"
                >
                  Signup
                </Button>
              </Link>
            </div>
          </div>
        </Row>
      </Container>
    </div>
  );
};

export default LandingPage;
