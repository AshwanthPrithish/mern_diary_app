import React, { useEffect, useState } from "react";
import MainScreen from "../../components/MainScreen/MainScreen";
import { Button, Card, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {
  updateEntryAction,
  deleteEntryAction,
} from "../../actions/entryActions";
import Loading from "../../components/Loading";
import ErrorMessage from "../../components/ErrorMessage";
import ReactMarkdown from "react-markdown";
import { useNavigate, useParams } from "react-router-dom";
import DateTimePicker from "../../components/DateTimePicker/DateTimePicker";
import axios from "axios";

const UpdateEntry = () => {
  const [title, setTitle] = useState();
  const [entryContent, setEntryContent] = useState();
  const [mood, setMood] = useState();
  const [selectedDate, setSelectedDate] = useState(null);
  const [checkCustomDateOrNot, setCheckCustomDateOrNot] = useState(false);
  let { id } = useParams();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const entryUpdate = useSelector((state) => state.entryUpdate);
  const { loading, error, success: successUpdate } = entryUpdate;

  const entryDelete = useSelector((state) => state.entryDelete);
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = entryDelete;

  const deleteHandler = (id) => {
    if (window.confirm("Are you sure?")) {
      dispatch(deleteEntryAction(id));
    }
    navigate("/myscripts");
  };

  useEffect(() => {
    const fetching = async () => {
      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      };
      const { data } = await axios.get(`/api/entries/${id}`, config);

      setTitle(data.title);
      setEntryContent(data.entryContent);
      setMood(data.mood);
      const newDate = new Date(data.date);
      setSelectedDate(newDate);
    };

    fetching();
  }, [id, userInfo.token, successDelete, successUpdate]);

  const updateHandler = (e) => {
    e.preventDefault();

    if (!title || !entryContent || !mood || !selectedDate) return;
    dispatch(updateEntryAction(id, title, entryContent, mood, selectedDate));

    resetHandler();
    navigate("/myscripts");
  };

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

  return (
    <MainScreen title="Update an Entry">
      <Card>
        <Card.Header>Update an Entry</Card.Header>
        <Card.Body>
          <Form onSubmit={updateHandler}>
            {loadingDelete && <Loading />}
            {error && <ErrorMessage variant="dark">{error}</ErrorMessage>}
            {errorDelete && (
              <ErrorMessage variant="dark">{errorDelete}</ErrorMessage>
            )}
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
                Update Entry
              </Button>

              <Button
                onClick={() => deleteHandler(id)}
                className="mx-2"
                variant="dark"
              >
                Delete Entry
              </Button>
            </Card.Footer>
          </Form>
        </Card.Body>
      </Card>
    </MainScreen>
  );
};

export default UpdateEntry;
