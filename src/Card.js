import Accordion from 'react-bootstrap/Accordion';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { useAccordionButton } from 'react-bootstrap/AccordionButton';
import { AiOutlineHeart, AiFillHeart } from 'react-icons/ai';
import { forwardRef, useEffect, useState } from 'react';

const TheCard = forwardRef(( props, ref ) => {
    const [flag, setFlag] = useState(false);
    const [toogleText, setToogleText]=useState("View description");

    useEffect(()=> {
        if (!flag) setToogleText("View description");
        else setToogleText("View less"); 
    }, [flag])
    function CustomToggle({ children, eventKey }) {
        const decoratedOnClick = useAccordionButton(eventKey, ()=> {
            setFlag(!flag);
        });
      
        return (
            <Button id="btn" variant="link" onClick={decoratedOnClick}>
            {children}
            </Button>
        );
      }
    const setErrorImage = () => {
        document.getElementById('img').src = "./noimg.jpeg";
    }
    //title, copyright, imageProps, date, explanation, url
    const [saved, setSave] = useState(false);
    useEffect(()=> {
        if (props.saved) {
            setSave(true);
        }
    }, []);
    const save = () => {
        console.log("saving");
        setSave(true);
        var item = {title: props.title, copyright: props.copyright, date: props.date, explanation: props.explanation, imgURL: props.url};
        console.log(item);
        props.storeItem(item);
    }
    const unsave = () => {
        console.log("unsaving");
        setSave(false);
        props.deleteItem(props.title);
    }
    return (
        <Accordion>
            <Card id="card">
                <Card.Img id="img" variant="top" {...props.imageProps} onError={setErrorImage}/>
                <h2></h2>
                {saved ? 
                <AiFillHeart id="heartIcon" onClick={unsave}/> 
                : <AiOutlineHeart id="heartIcon" onClick={save}/> 
                }
                <Card.Body>
                <Card.Title>{props.title}</Card.Title>
                <Card.Subtitle id="truncate" className="mb-2 text-muted">{props.copyright}</Card.Subtitle>
                <Card.Subtitle className="mb-2 text-muted">{props.date}</Card.Subtitle>

                <Accordion.Collapse eventKey="0">
                    <Card.Text>
                        {props.explanation}
                    </Card.Text>
                </Accordion.Collapse>
                
                </Card.Body>
                <CustomToggle eventKey="0">{toogleText}</CustomToggle>
            </Card>
        </Accordion>
    )
});
export default TheCard;