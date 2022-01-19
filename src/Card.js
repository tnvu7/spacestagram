import Accordion from 'react-bootstrap/Accordion';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { useAccordionButton } from 'react-bootstrap/AccordionButton';
import { AiOutlineHeart, AiFillHeart } from 'react-icons/ai';
import { forwardRef, useEffect, useState } from 'react';


function CustomToggle({ children, eventKey }) {
    const decoratedOnClick = useAccordionButton(eventKey, ()=> {
        //change View more/less
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

const TheCard = forwardRef(( props, ref ) => {
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
    }
    return (
        <Accordion>
            <Card id="card">
                <Card.Img id="img" variant="top" {...props.imageProps} onError={setErrorImage}/>
                <h2></h2>
                {saved ? 
                
                <AiFillHeart id="heartIcon" onClick={unsave}/> : <AiOutlineHeart id="heartIcon" onClick={save}/> 
                }

                <Card.Title>{props.title}</Card.Title>
                <Card.Subtitle id="truncate" className="mb-2 text-muted">{props.copyright}</Card.Subtitle>
                <Card.Subtitle className="mb-2 text-muted">{props.date}</Card.Subtitle>

                <Accordion.Collapse eventKey="0">
                    <Card.Text>
                        {props.explanation}
                    </Card.Text>
                </Accordion.Collapse>
                <CustomToggle eventKey="0"> View more/less</CustomToggle>

            </Card>
        </Accordion>
    )
});
export default TheCard;