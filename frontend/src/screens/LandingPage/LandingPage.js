import React from "react";
import { Button, Container, Row } from "react-bootstrap";
import "./LandingPage.css";

const LandingPage = () => {
  return (
    <div className="main">
      <Container>
        <Row>
          <div className="intro-text">
            <div>
              <h1 className="title">The Realm of Souls Welcomes you!</h1>
              <p className="subtitle">
                Unleash your words. Explore a captivating online diary
                experience. Share, reflect, connect. Welcome to your
                storytelling sanctuary.
              </p>
            </div>
            <div className="buttonContainer">
              <a href="/login">
                <Button
                  size="lg"
                  className="landingbutton"
                  style={{ marginRight: "30px" }}
                  variant="secondary"
                >
                  Login
                </Button>
              </a>
              <a href="/signup">
                <Button
                  size="lg"
                  className="landingbutton"
                  style={{ marginLeft: "30px" }}
                  variant="secondary"
                >
                  Signup
                </Button>
              </a>
            </div>
          </div>
        </Row>
      </Container>
    </div>
  );
};

export default LandingPage;
