import style from "../css/Footer.css";
import { BiCopyright } from "react-icons/bi";
import Container from "react-bootstrap/Container";
import { SiReact } from "react-icons/si";
import { FaLinkedin } from "react-icons/fa";
import { AiFillGithub } from "react-icons/ai";

import OverlayTriggerComponent from "./OverlayTrigger";

function Footer() {
  return (
    <footer>
      <Container fluid className={style.fluid}>
        <div className={style.contactSection}>
          <OverlayTriggerComponent text="LinkedIn">
            <a
              href="https://www.linkedin.com/in/natalie-vu-6a7ab9167/"
              target="__blank"
              rel="noreferrer"
            >
              <FaLinkedin size="2rem" />
            </a>
          </OverlayTriggerComponent>
          <OverlayTriggerComponent text="Source code">
            <a
              href="https://github.com/tnvu7/spacestagram"
              target="__blank"
              rel="noreferrer"
            >
              <AiFillGithub size="2rem" color="white" />
            </a>
          </OverlayTriggerComponent>
        </div>
        <br />
      </Container>
      <BiCopyright /> Natalie Vu, 2022 using &nbsp;
      <SiReact className={style.reactIcon} />
    </footer>
  );
}
export default Footer;
