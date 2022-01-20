import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
import Button from "react-bootstrap/Button";

const OverlayTriggerComponent = ({text, children}) => {
  return (
    <OverlayTrigger
      placement="bottom"
      overlay={<Tooltip id={`tooltip-bottom`}>{text} </Tooltip>}
    >
      <Button variant="link">
        {children}
      </Button>
    </OverlayTrigger>
  )
}
export default OverlayTriggerComponent;
