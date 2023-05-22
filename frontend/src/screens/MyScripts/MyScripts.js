import React, { useEffect, useState } from "react";
import MainScreen from "../../components/MainScreen/MainScreen";
import { Accordion, Badge, Button, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import axios from "axios";
import "./MyScripts.css";
const MyScripts = () => {
  const [entries, setEntries] = useState([]);
  const deleteHandler = (id) => {
    if (window.confirm("Are you sure?")) {
    }
  };

  const fetchNotes = async () => {
    const { data } = await axios.get("/api/entries");
    setEntries(data);
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  return (
    <MainScreen title="Welcome bro">
      <Link to="/add-entry">
        <Button
          style={{ marginLeft: 10, marginBottom: 6 }}
          size="lg"
          variant="secondary"
        >
          Add Entry
        </Button>
      </Link>
      {entries.map((entry) => (
        <Accordion defaultActiveKey="0" key={entry._id}>
          <Card
            style={{
              margin: "10px 10px 15px 10px",
            }}
          >
            <Card.Header
              style={{
                display: "flex",
              }}
            >
              <span
                style={{
                  textDecoration: "none",
                  flex: 1,
                  cursor: "pointer",
                  alignSelf: "center",
                  fontSize: 18,
                }}
              >
                <Accordion.Header as={Card.Text}>
                  {entry.title.charAt(0).toUpperCase() + entry.title.slice(1)}
                </Accordion.Header>
              </span>

              <div style={{ paddingLeft: "20px", marginTop: "15px" }}>
                <Button variant="dark" href={`/entries/${entry._id}`}>
                  Edit
                </Button>
                <Button
                  variant="dark"
                  className="mx-2"
                  onClick={() => deleteHandler(entry._id)}
                >
                  Delete
                </Button>
              </div>
            </Card.Header>
            <Accordion.Body>
              <Card.Body>
                <h4>
                  <Badge bg="secondary">Mood - {entry.mood}</Badge>
                </h4>
                <blockquote className="blockquote mb-0">
                  <p>{entry.entry}</p>
                  <footer className="blockquote-footer">
                    <cite title="Source Title">{entry.date}</cite>
                  </footer>
                </blockquote>
              </Card.Body>
            </Accordion.Body>
          </Card>
        </Accordion>
      ))}
      <br />
      <br />
    </MainScreen>
  );
};

export default MyScripts;
