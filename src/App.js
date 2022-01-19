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
import FloatingLabel from 'react-bootstrap/FloatingLabel'
import './css/App.css';

function App() {
    const [data, setData] = useState([]);
    const [input, setUserInput] = useState("");
    const [errMsg, setErrMsg] = useState("");
    const [loaded, setLoad] = useState(false);

    useEffect(() => {
        getData(6).then(data => {
            setData(data);
            setLoad(true);
        });
        document.getElementById('my-form').addEventListener('onsubmit', SubmitHandler, false);
        console.log("reload");
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
    return (
        <div >
            <Container>
                <h1>Spacestagram</h1>
                <Form inline>
                    <Form.Group >
                        <FloatingLabel controlId="floatingPassword" label="Number of pictures...">
                            <Form.Control id='my-form' type="text" className="mr-sm-2" placeholder="Number of pictures..." 
                            onChange={onChange} onKeyDown={handleInput} />
                        </FloatingLabel>
                        <Button variant="outline-primary" onSubmit={SubmitHandler}>Search</Button>
                    </Form.Group>
                </Form>
                {errMsg !== "" ? <Alert variant="danger"> {errMsg}  </Alert> : null}

                {loaded ?
                    <Row xs={1} md={2} className="g-4">
                        {data.map((obj) => (
                            <Col>
                                <TheCard
                                    key={obj.title}
                                    title={obj.title}
                                    copyright={obj.copyright}
                                    date={obj.date}
                                    explanation={obj.explanation}
                                    imageProps={{ src: `${obj.url}` }}
                                />
                            </Col>
                        ))}
                    </Row>
                    : <Spinner animation="border" />}



            </Container>
        </div>
    )
}
export default App;