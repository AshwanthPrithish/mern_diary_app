import React, { useEffect, useState } from "react";
import MainScreen from "../../components/MainScreen/MainScreen";
import { Button, Card, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { createEntryAction } from "../../actions/entryActions";
import Loading from "../../components/Loading";
import ErrorMessage from "../../components/ErrorMessage";
import ReactMarkdown from "react-markdown";
import { useNavigate } from "react-router-dom";
import DateTimePicker from "../../components/DateTimePicker/DateTimePicker";

const CreateEntry = () => {
  const [title, setTitle] = useState("");
  const [entryContent, setEntryContent] = useState("");
  const [mood, setMood] = useState("");
  const [selectedDate, setSelectedDate] = useState(null);
  const [checkCustomDateOrNot, setCheckCustomDateOrNot] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const entryCreate = useSelector((state) => state.entryCreate);
  const { loading, error } = entryCreate;

  useEffect(() => {
    if (!userInfo) {
      navigate("/");
    }
  }, [userInfo, navigate]);

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const currentDateHandler = () => {
    const currentDate = new Date();
    setSelectedDate(currentDate);
    setCheckCustomDateOrNot(false);
  };
  const customDateHandler = () => {
    setCheckCustomDateOrNot(true);
  };

  const resetHandler = () => {
    setTitle("");
    setMood("");
    setEntryContent("");
    setSelectedDate(null);
  };

  const submitHandler = (e) => {
    e.preventDefault();

    if (!title || !entryContent || !mood || !selectedDate) {
      return;
    }
    dispatch(createEntryAction(title, entryContent, mood, selectedDate));
    resetHandler();
    navigate("/myscripts");
  };

  useEffect(() => {}, [userInfo]);

  return (
    <MainScreen title="Create an Entry">
      <Card>
        <Card.Header>Create a new Entry</Card.Header>
        <Card.Body>
          <Form onSubmit={submitHandler}>
            {error && <ErrorMessage variant="dark">{error}</ErrorMessage>}
            <Form.Group controlId="title">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="title"
                value={title}
                placeholder="Enter the title"
                onChange={(e) => setTitle(e.target.value)}
              />
            </Form.Group>
            <br />

            <Form.Group controlId="content">
              <Form.Label>Content</Form.Label>
              <Form.Control
                as="textarea"
                value={entryContent}
                placeholder="Enter the content of the entry"
                rows={4}
                onChange={(e) => setEntryContent(e.target.value)}
              />
            </Form.Group>
            {entryContent && (
              <Card>
                <Card.Header>Entry Preview</Card.Header>
                <Card.Body>
                  <ReactMarkdown>{entryContent}</ReactMarkdown>
                </Card.Body>
              </Card>
            )}
            <br />
            <Form.Group controlId="content">
              <Form.Label>Mood</Form.Label>
              <Form.Control
                type="content"
                value={mood}
                placeholder="Enter the Mood"
                onChange={(e) => setMood(e.target.value)}
              />
            </Form.Group>
            <br />
            {loading && <Loading size={50} />}
            <Form.Label>Pick a Date</Form.Label>
            <br />
            <Button variant="secondary" onClick={() => currentDateHandler()}>
              Choose Current Date
            </Button>
            <Button
              className="mx-2"
              variant="secondary"
              onClick={() => customDateHandler()}
            >
              Choose Custom Date
            </Button>
            <br />
            <br />
            {checkCustomDateOrNot === true && (
              <>
                <DateTimePicker onChange={handleDateChange} />
                <br />
                <br />
              </>
            )}

            {selectedDate && (
              <Card.Footer className="text-muted">
                Chosen date is -{" "}
                {`${selectedDate.getDate().toString().padStart(2, "0")}/${(
                  selectedDate.getMonth() + 1
                )
                  .toString()
                  .padStart(
                    2,
                    "0"
                  )}/${selectedDate.getFullYear()} ${selectedDate
                  .getHours()
                  .toString()
                  .padStart(2, "0")}:${selectedDate
                  .getMinutes()
                  .toString()
                  .padStart(2, "0")}:${selectedDate
                  .getSeconds()
                  .toString()
                  .padStart(2, "0")}`}
              </Card.Footer>
            )}

            <Card.Footer>
              <Button type="submit" variant="dark">
                Create Entry
              </Button>
              <Button className="mx-2" onClick={resetHandler} variant="dark">
                Reset Fields
              </Button>
            </Card.Footer>
          </Form>
        </Card.Body>
      </Card>
    </MainScreen>
  );
};

export default CreateEntry;
