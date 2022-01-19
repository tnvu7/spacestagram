import Accordion from 'react-bootstrap/Accordion';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { useAccordionButton } from 'react-bootstrap/AccordionButton';
import { AiOutlineHeart, AiFillHeart } from 'react-icons/ai';


function CustomToggle({ children, eventKey }) {
    //var isExpanded = false;
    const decoratedOnClick = useAccordionButton(eventKey, ()=> {
        
        // isExpanded = document.getElementById("accordion").getAttribute("aria-expanded");
        // console.log(isExpanded);
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
const TheCard = ({ title, copyright, imageProps, date, explanation }) => {
    return (
        <Accordion>
            <Card id="card">
                <Card.Img id="img" variant="top" {...imageProps} onError={setErrorImage}/>
                <AiOutlineHeart />
                <AiFillHeart/>
                <Card.Title>{title}</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">{copyright}</Card.Subtitle>
                <Card.Subtitle className="mb-2 text-muted">{date}</Card.Subtitle>

                <Accordion.Collapse eventKey="0">
                    <Card.Text>
                        {explanation}
                    </Card.Text>
                </Accordion.Collapse>
                <CustomToggle eventKey="0"> View more/less</CustomToggle>

            </Card>
        </Accordion>
    )
}
export default TheCard;