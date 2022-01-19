import { useEffect, useState } from 'react';
import Container from 'react-bootstrap/Container';
import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';
import { CardGroup } from "react-bootstrap";
import getData from './api/api.js';
import TheCard from './Card.js';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import Card from 'react-bootstrap/Card';
import './css/App.css';

function App() {
    const [data, setData] = useState([]);
    const [input, setUserInput] = useState("");
    const [errMsg, setErrMsg] = useState("");
    const [loaded, setLoad] = useState(false);

    useEffect(() => {
        getData(6).then(data => {
            setData(data);
            console.log(loaded)
            console.log(data);
            setLoad(true);
        });
    }, []);
    // useEffect(() => {
    //     console.log(data);
    //     setLoad(true);
    // }, [data]);

    const SubmitHandler = (event) => {

        if (input == "") {
            setErrMsg("Please enter a number");
        } else {
            const res = getData(input);
            setData(res);
        }
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
                {/* <Form>
                    <Form.Group className="mb-3" controlId="formBasicText">
                        <Form.Label>Number of pictures</Form.Label>
                        <Form.Control type="text" placeholder="Enter the number of pictures..." onChange={onChange} onKeyDown={handleInput}/>
                        <Button variant="outline-primary" onClick={SubmitHandler()}>Search</Button>
                    </Form.Group>
                </Form> 
                <Alert variant="danger"> {errMsg}  </Alert> */}

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
                    imageProps={{ src: `${obj.url}`}}
                    />
                  </Col>
                ))}
              </Row>
                
                 : null}
                


            </Container>
        </div>
    )
}
export default App;