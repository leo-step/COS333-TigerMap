import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";

function NotFound() {
  return (
    <Container fluid style={{ maxWidth: "1600px" }}>
      <Row className="justify-content-center">
        <div style={{ textAlign: "center", maxWidth: "800px" }}>
          <br/>
          <br/>
          <h3>Page not found.</h3>
        </div>
      </Row>
    </Container>
  );
}

export default NotFound;
