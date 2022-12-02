import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';

function BasicExample() {
  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Container>
        <Navbar.Brand href="/">Home</Navbar.Brand>
        <Navbar.Brand href="/createtrack">Create Track</Navbar.Brand>
        <Navbar.Brand href="/tracks">Browse Tracks</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default BasicExample;