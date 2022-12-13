import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import billhead from "../images/billhead.png";
import aaliyahhead from "../images/aaliyahhead.png";
import leohead from "../images/leohead.png";

function About() {
  return (
    <Container fluid style={{ maxWidth: "1000px" }}>
      <Row className="justify-content-center">
        <div style={{ textAlign: "center", maxWidth: "800px" }}>
          <br />
          <br />
          <h3>About TigerMap!</h3>
          <br />
          <p>
            Course selection is an exciting but frustrating time to be a
            Princeton student. While you can look at all the cool classes that
            the university has to offer, it is challenging to find a full list
            of prerequisites and borderline impossible to find what courses each
            of them leads to in the future. Furthermore, it's hard to compose
            tracks of courses that take all of the prerequisites into account.
            Only certain departments offer predefined course tracks, but they
            are often outdated and not rigorously followed. TigerMap addresses
            these common student needs. A user can search for a specific class
            using a search bar and then browse through its prereqs and postreqs,
            going down different course paths and efficiently exploring the
            options available to them. These course tracks can then be saved and
            shared between users, making researching courses easier than ever
            before.{" "}
          </p>
          <br />
        </div>
      </Row>
      <Row className="justify-content-center">
        <div style={{ textAlign: "center" }}>
          <br />
          <h3>Our Team</h3>
        </div>
      </Row>
      <Row className="justify-content-center">
        <Col style={{ textAlign: "center" }}>
          <img src={leohead} alt="leohead" style={{ maxWidth: "250px " }} />
          <h6> Leo Stepanewk '25</h6>
        </Col>
        <Col style={{ textAlign: "center" }}>
          <img
            src={aaliyahhead}
            alt="aaliyahhead"
            style={{ maxWidth: "250px " }}
          />
          <h6> Aaliyah Sayed '25</h6>
        </Col>
        <Col style={{ textAlign: "center" }}>
          <img src={billhead} alt="billhead" style={{ maxWidth: "250px " }} />
          <h6> Bill Ao '24</h6>
        </Col>
      </Row>
    </Container>
  );
}

export default About;
