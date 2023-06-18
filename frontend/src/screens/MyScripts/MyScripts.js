import React, { useEffect } from "react";
import MainScreen from "../../components/MainScreen/MainScreen";
import { Accordion, Badge, Button, Card } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import "./MyScripts.css";
import { deleteEntryAction, listEntries } from "../../actions/entryActions";
import Loading from "../../components/Loading";
import ErrorMessage from "../../components/ErrorMessage";
const MyScripts = ({ search }) => {
  const entryList = useSelector((state) => state.entryList);
  const { loading, error, entries } = entryList;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const entryCreate = useSelector((state) => state.entryCreate);
  const { success: successCreate } = entryCreate;

  const entryDelete = useSelector((state) => state.entryDelete);
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = entryDelete;

  const getFormattedDate = (e) => {
    const date = new Date(e);
    return `${date.getDate().toString().padStart(2, "0")}/${(
      date.getMonth() + 1
    )
      .toString()
      .padStart(2, "0")}/${date.getFullYear()} ${date
      .getHours()
      .toString()
      .padStart(2, "0")}:${date.getMinutes().toString().padStart(2, "0")}:${date
      .getSeconds()
      .toString()
      .padStart(2, "0")}`;
  };

  const deleteHandler = (id) => {
    return () => {
      if (window.confirm("Are you sure?")) {
        dispatch(deleteEntryAction(id));
      }
      navigate("/myscripts");
    };
  };

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(listEntries());
    if (!userInfo) {
      navigate("/");
    }
  }, [dispatch, navigate, successCreate, userInfo, successDelete]);

  return (
    <MainScreen title={`Welcome back... ${userInfo.name.split(" ")[0]}`}>
      <Link to="/create-entry">
        <Button
          style={{ marginLeft: 10, marginBottom: 6 }}
          size="lg"
          variant="secondary"
        >
          Add Entry
        </Button>
      </Link>
      {loadingDelete && <Loading />}
      {errorDelete && <ErrorMessage variant="dark">{errorDelete}</ErrorMessage>}
      {loading && <Loading />}
      {error && <ErrorMessage>{error}</ErrorMessage>}
      {entries
        ?.reverse()
        .filter((filteredNote) =>
          filteredNote.title.toLowerCase().includes(search.toLowerCase())
        )
        .map((entry) => (
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
                  <Link to={`/entry/${entry._id}`}>
                    <Button variant="dark">Edit</Button>
                  </Link>
                  <Button
                    variant="dark"
                    // style={{
                    //   ...(window.innerWidth >= 370
                    //     ? { marginLeft: "15px" }
                    //     : window.innerWidth <= 350
                    //     ? { marginTop: "10px" }
                    //     : {}),
                    //   display: "flex",
                    //   flexDirection: "column",
                    //   alignItems: "center",
                    //   fontSize: "12px",
                    // }}
                    style={{ marginLeft: "10px" }}
                    onClick={deleteHandler(entry._id)}
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
                    <p>{entry.entryContent}</p>
                    <footer className="blockquote-footer">
                      <cite title="Source Title">
                        {getFormattedDate(entry.date)}
                      </cite>
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
