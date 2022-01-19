import { useEffect, useState } from 'react';
import Container from 'react-bootstrap/Container';
import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';
import { CardGroup } from "react-bootstrap";
import getData from './api/api.js';
import TheCard from './Card.js';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row';
import Spinner from 'react-bootstrap/Spinner'
import Card from 'react-bootstrap/Card';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import './css/App.css';

function App() {
    const [data, setData] = useState([]);
    const [input, setUserInput] = useState("");
    const [errMsg, setErrMsg] = useState("");
    const [loaded, setLoad] = useState(false);
    const [favItems, setFavItems] = useState(JSON.parse(window.localStorage.getItem("favItems") || "[]"));
    const [favView, setFavView] = useState(false);
    const [saved, setSaveState] = useState(false);

    useEffect(() => {
        getData(6).then(data => {
            setData(data);
            setLoad(true);
            console.log(data);
        });
        //deleteAll();
        document.getElementById('my-form').addEventListener('onsubmit', SubmitHandler, false);
    }, []);

    const SubmitHandler = (event) => {
        event.preventDefault();
        if (input == "" || isNaN(input)) {
            setErrMsg("Please enter a number");
        } else {
            getData(input).then(data => {
                setData(data);
                setLoad(true);
            });
        }
    }
    const onChange = (e) => {
        setUserInput(e.target.value);
        setErrMsg("");
    }
    const handleInput = (e) => {
        if (e.key === 'Enter') {
            SubmitHandler(e);
        }
    }
    const storeItem = (newItem) => {
        if (localStorage.getItem("favItems")) {
            var itemsStorage = JSON.parse(localStorage.getItem("favItems"));
            itemsStorage.push(newItem);
            localStorage.setItem("favItems", JSON.stringify(itemsStorage));
        } else {
            var newitemsArr = [];
            newitemsArr.push(newItem);
            localStorage.setItem("favItems", JSON.stringify(newitemsArr));
        }
        setFavItems([...favItems, newItem]);
    }
    function deleteAll() {
        localStorage.clear();
    }
    const deleteItem = (item) => {
        if (localStorage.getItem("favItems")) {
            
        }
    }
    return (
        <div >
            <Container id="container">
                <h1>Spacestagram</h1>
                <Form id="form" inline="true">
                    <Form.Group >
                        <FloatingLabel label="Number of pictures...">
                            <Form.Control id='my-form' type="text" className="mr-sm-2" placeholder="Number of pictures..."
                                onChange={onChange} onKeyDown={handleInput} />
                        </FloatingLabel>
                        <Button variant="outline-primary" onClick={() => {
                            setFavView(!favView);
                        }}>{favView ? 'Back' : 'Favourites'}</Button>
                    </Form.Group>
                </Form>
                {errMsg !== "" ? <Alert variant="danger"> {errMsg}  </Alert> : null}

                {loaded ?
                    <Row id="row" xs={1} md={2} className="g-4">
                        {favView ?
                            <>
                                {favItems.map((obj) => (
                                    <Col >
                                        <TheCard
                                            key={obj.title}
                                            title={obj.title}
                                            copyright={obj.copyright}
                                            date={obj.date}
                                            explanation={obj.explanation}
                                            imageProps={{ src: `${obj.imgURL}` }}
                                            url={obj.imgURL}
                                            storeItem={storeItem}
                                            saved={true}
                                        />
                                    </Col>
                                ))}
                            </> :
                            <>
                                {data.map((obj) => (
                                    <Col >
                                        <TheCard
                                            key={obj.title}
                                            title={obj.title}
                                            copyright={obj.copyright}
                                            date={obj.date}
                                            explanation={obj.explanation}
                                            imageProps={{ src: `${obj.url}` }}
                                            url={obj.url}
                                            storeItem={storeItem}
                                        />
                                    </Col>
                                ))}
                            </>
                        }
                    </Row>
                    : <Spinner animation="border" />}
            </Container>
        </div>
    )
}
export default App;