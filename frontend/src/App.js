import { useState, useEffect } from "react";
import axios from "axios";
import Table from "./components/Table";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import CurrentCourse from "./components/CurrentCourse";
import Select from "react-select";

function App() {
  const [response, setResponse] = useState([]);
  const [courseId, setCourseId] = useState(null);
  const [query, setQuery] = useState(null);
  const [data, setData] = useState(null);

  useEffect(() => {
    if (query) {
      axios
        .get("http://127.0.0.1:5000/search", { params: { query: query } })
        .then((response) => {
          let result = response.data;
          for (let i = 0; i < result.length; i++) {
            result[i].label =
              result[i].crosslistings + " - " + result[i].long_title;
            result[i].value = result[i]._id;
          }
          setResponse(result);
        });
    }
  }, [query]);

  useEffect(() => {
    if (courseId) {
      axios
        .get("http://127.0.0.1:5000/api", { params: { course_id: courseId } })
        .then((response) => {
          setData(response.data);
        });
    }
  }, [courseId]);

  return (
    <Container fluid>
      <Row>
        <Col>
          <CurrentCourse details={data}/>
        </Col>
        <Select
          onInputChange={(val) => setQuery(val)}
          onChange={(event) => {
            setCourseId(event._id);
          }}
          options={response}
        />
      </Row>
      <Row>
        <Col>
          <Table setCourseId={setCourseId} courses={(data && data.prereqs) || []}/>
        </Col>
        <Col>
          <Table setCourseId={setCourseId} courses={(data && data.postreqs) || []}/>
        </Col>
      </Row>
    </Container>
  );
}

export default App;
