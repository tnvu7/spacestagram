import Accordion from "react-bootstrap/Accordion";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { useAccordionButton } from "react-bootstrap/AccordionButton";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { forwardRef, useState } from "react";

const TheCard = forwardRef((props, ref) => {
  const [flag, setFlag] = useState(false);
  const [imageSrc, setImageSrc] = useState(props.imageProps.src);

  const setErrorImage = () => {
    setImageSrc("./noimg.jpeg");
  };

  const save = () => {
    const { title, copyright, date, explanation, url } = props;
    const item = {
      title,
      copyright,
      date,
      explanation,
      imgURL: url,
    };
    props.onAddToFavourite(item);
  };

  const unsave = () => {
    props.onRemoveFromFavourite(props.title);
  };

  return (
    <Accordion>
      <Card className="card">
        <Card.Img
          className="img"
          variant="top"
          {...props.imageProps}
          src={imageSrc}
          onError={setErrorImage}
        />

        {props.saved ? (
          <AiFillHeart className="heartIcon" onClick={unsave} />
        ) : (
          <AiOutlineHeart className="heartIcon" onClick={save} />
        )}
        <Card.Body>
          <Card.Title>{props.title}</Card.Title>
          <Card.Subtitle className="truncate mb-2 text-muted">
            {props.copyright}
          </Card.Subtitle>
          <Card.Subtitle className="mb-2 text-muted">
            {props.date}
          </Card.Subtitle>

          <Accordion.Collapse eventKey="0">
            <Card.Text>{props.explanation}</Card.Text>
          </Accordion.Collapse>
        </Card.Body>
        <CustomToggle eventKey="0" onClick={() => setFlag((state) => !state)}>
          {flag ? "View Less" : "View Description"}
        </CustomToggle>
      </Card>
    </Accordion>
  );
});
export default TheCard;

const CustomToggle = ({ children, eventKey, onClick }) => {
  const decoratedOnClick = useAccordionButton(eventKey, onClick);
  return (
    <Button className="btn" variant="link" onClick={decoratedOnClick}>
      {children}
    </Button>
  );
};
