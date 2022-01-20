import { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Alert from "react-bootstrap/Alert";
import getData from "./services/api.js";
import TheCard from "./components/Card.js";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Spinner from "react-bootstrap/Spinner";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tab";
import Footer from "./components/Footer.js";
import "./css/App.css";

function App() {
  const [data, setData] = useState();
  const [input, setUserInput] = useState(6);
  const [errMsg, setErrMsg] = useState("");
  const [favItems, setFavItems] = useState(
    JSON.parse(localStorage.getItem("favItems") || "[]")
  );

  useEffect(() => {
    getData(input).then((data) => setData(data));
  }, []);

  useEffect(() => {
    localStorage.setItem("favItems", JSON.stringify(favItems));
  }, [favItems]);

  const IsValidInput = (input) => {
    if (isNaN(input)) return false;
    if (input < 0 || input > 100) return false;
    return true;
  };

  const SubmitHandler = (event) => {
    event.preventDefault();
    if (!IsValidInput(input)) {
      setErrMsg("Please enter a number between 0 and 100 inclusively");
    } else {
      getData(input).then((data) => setData(data));
    }
  };

  const onChange = (e) => {
    setUserInput(e.target.value);
    setErrMsg("");
  };

  const addToFavourite = (newItem) => {
    setFavItems((items) => [...items, newItem]);
  };

  const deleteFromFavourite = (title) => {
    setFavItems(favItems.filter((item) => item.title !== title));
  };

  return (
    <div>
      <Container id="container">
        <h1>SPACESTAGRAM</h1>
        <Form id="form" inline="true" onSubmit={SubmitHandler}>
          <Form.Group>
            <FloatingLabel label="Number of pictures...">
              <Form.Control
                id="picture-count-input"
                type="number"
                className="mr-sm-2"
                placeholder="Number of pictures..."
                onChange={onChange}
              />
            </FloatingLabel>
          </Form.Group>
        </Form>
        {errMsg !== "" ? <Alert variant="danger"> {errMsg} </Alert> : null}
        <Tabs
          defaultActiveKey="home"
          id="tabs"
          className="mb-3"
          transition={true}
        >
          <Tab eventKey="home" title="Home">
            {data ? (
              <Row id="row" xs={1} md={2} className="g-4">
                {data.map((obj) => (
                  <Col>
                    <TheCard
                      key={obj.title}
                      title={obj.title}
                      copyright={obj.copyright}
                      date={obj.date}
                      explanation={obj.explanation}
                      imageProps={{ src: `${obj.url}` }}
                      url={obj.url}
                      onAddToFavourite={addToFavourite}
                      onRemoveFromFavourite={deleteFromFavourite}
                      saved={favItems.some((item) => item.title === obj.title)}
                    />
                  </Col>
                ))}
              </Row>
            ) : (
              <Spinner animation="border" />
            )}
          </Tab>
          <Tab eventKey="favourite" title="Favourite">
            {favItems ? (
              <Row id="row" xs={1} md={2} className="g-4">
                {favItems.map((obj) => (
                  <Col>
                    <TheCard
                      key={obj.title}
                      title={obj.title}
                      copyright={obj.copyright}
                      date={obj.date}
                      explanation={obj.explanation}
                      imageProps={{ src: `${obj.imgURL}` }}
                      url={obj.imgURL}
                      onAddToFavourite={addToFavourite}
                      onRemoveFromFavourite={deleteFromFavourite}
                      saved={true}
                    />
                  </Col>
                ))}
              </Row>
            ) : (
              <Spinner animation="border" />
            )}
          </Tab>
        </Tabs>
        <Footer />
      </Container>
    </div>
  );
}
export default App;
