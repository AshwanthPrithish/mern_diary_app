import React from "react";
import { Link } from "react-router-dom";
import { Button, Container, Row } from "react-bootstrap";
import "./LandingPage.css";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const LandingPage = () => {
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const navigate = useNavigate();
  useEffect(() => {
    if (userInfo) {
      navigate("/myscripts");
    }
  }, [navigate, userInfo]);
  return (
    <div className="main-land">
      <Container>
        <Row>
          <div className="intro-text-land">
            <div>
              <h1 className="title-land">The Realm of Souls Welcomes you!</h1>
              <p className="subtitle-land">
                Unleash your words. Explore a captivating online diary
                experience. Share, reflect, connect. Welcome to your
                storytelling sanctuary.
              </p>
            </div>
            <div className="buttonContainer-land">
              <Link to="/login">
                <Button
                  size="lg"
                  className="landingbutton-land"
                  variant="secondary"
                >
                  Login
                </Button>
              </Link>
              <Link to="/signup">
                <Button
                  size="lg"
                  className="landingbutton-land"
                  style={{
                    ...(window.innerWidth >= 768 ? { marginLeft: "30px" } : {}),
                  }}
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
