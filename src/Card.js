import Accordion from 'react-bootstrap/Accordion';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

const TheCard = ({ title, copyright, imageProps, date, explanation }) => {
    return (
        
            <Card id="card">
                <Card.Img id="img" variant="top" {...imageProps} />
                <Card.Body>
                    <Card.Title>{ title }</Card.Title>
                    <Card.Subtitle className="mb-2 text-muted">{ copyright }</Card.Subtitle>
                    <Card.Subtitle className="mb-2 text-muted">{ date }</Card.Subtitle>
                    <Card.Text>
                        { explanation }
                    </Card.Text>
                </Card.Body>
                <Button variant="primary"> Like </Button>
                
            </Card>
    )
}
export default TheCard;