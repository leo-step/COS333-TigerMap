import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";

function Error() {
  return (
    <Container fluid style={{ maxWidth: "1600px" }}>
      <Row className="justify-content-center">
        <div style={{ textAlign: "center", maxWidth: "800px" }}>
          <br/>
          <br/>
          <h3>An error occurred. Please contact the system administrator.</h3>
        </div>
      </Row>
    </Container>
  );
}

export default Error;
