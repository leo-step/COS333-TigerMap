import { useState, useEffect } from "react";
import axios from "axios";
import Table from "./Table";
import "bootstrap/dist/css/bootstrap.min.css";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import CurrentCourse from "./CurrentCourse";
import Select from "react-select";
import logo from "../images/logo.png";
import Form from "./Form";

function Main() {
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
    <Container fluid style={{maxWidth: "1600px"}}>
      <Row className="justify-content-center">
        <div style={{ maxWidth: "500px" }}>
          <img src={logo} alt="TigerMap" style={{ maxWidth: "100%" }}/>
          <Select
            onInputChange={(val) => setQuery(val)}
            onChange={(event) => {
              setCourseId(event._id);
            }}
            options={response}
            placeholder="Search"
            className="m-2"
          />
        </div>
      </Row>
      {data && (
        <Row>
          <Col>
            <CurrentCourse details={data} />
          </Col>
        </Row>
      )}
      {data && (
        <Row>
          <Col>
            <Table
              header={"Prerequsites"}
              setCourseId={setCourseId}
              courses={data.prereqs}
            />
          </Col>
          <Col>
            <Table
              header={"Postrequsites"}
              setCourseId={setCourseId}
              courses={data.postreqs}
            />
          </Col>
        </Row>
      )}
         <Form></Form>
    </Container>


  );
}

export default Main;