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

function Main() {
  const [response, setResponse] = useState([
    {
      _id: "001381",
      value: "001381",
      label: "ECO 100 - Introduction to Microeconomics",
    },
    { _id: "004140", value: "004140", label: "MAT 104 - Calculus II" },
    {
      _id: "002054",
      value: "002054",
      label: "COS 226 - Algorithms and Data Structures",
    },
    {
      _id: "013781",
      value: "013781",
      label:
        "POL 345 / SOC 305 / SPI 211 - Introduction to Quantitative Social Science",
    },
    {
      _id: "000880",
      value: "000880",
      label: "MOL 345 / CHM 345 - Biochemistry",
    },
  ]);
  const [courseId, setCourseId] = useState(null);
  const [query, setQuery] = useState(null);
  const [data, setData] = useState();

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
          console.log(result);
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
    <Container fluid style={{ maxWidth: "1600px" }}>
      <Row className="justify-content-center">
        <div style={{ textAlign: "center", maxWidth: "800px" }}>
          <img src={logo} alt="TigerMap" style={{ maxWidth: "500px " }} />
          <p style={{ fontSize: "24px" }}>
            Course selection can feel like a treasure hunt with no destination.
            TigerMap helps you find the way to the courses you want to take in
            the future. 🗺️{" "}
          </p>
        </div>
      </Row>
      <Row className="justify-content-center">
        <div style={{ maxWidth: "720px" }}>
          <p style={{fontSize: "20px"}}>
            <Select
              onInputChange={(val) => setQuery(val)}
              onChange={(event) => {
                setCourseId(event._id);
              }}
              options={response}
              placeholder="Search for a class by entering a name or keyword"
              className="m-2"
            />
          </p>
        </div>
      </Row>
      <Row>
        <Col>
          <CurrentCourse details={data} />
        </Col>
      </Row>
      {(data && (
        <Row>
          <Col>
            <Table
              header={"Prerequsites"}
              setCourseId={setCourseId}
              courses={data.prereqs}
              placeholder={
                (data.prereqs.length > 0 &&
                  "Click a course to view its details") ||
                "This course has no prerequisites."
              }
            />
          </Col>
          <Col>
            <Table
              header={"This course leads to..."}
              setCourseId={setCourseId}
              courses={data.postreqs}
              placeholder={
                (data.postreqs.length > 0 &&
                  "Click a course to view its details") ||
                "This course doesn't lead to any classes."
              }
            />
          </Col>
        </Row>
      )) || (
        <Row>
          <Col>
            <Table
              header={"Prerequsites"}
              setCourseId={setCourseId}
              placeholder={"Click a course to view its details"}
            />
          </Col>
          <Col>
            <Table
              header={"This course leads to..."}
              setCourseId={setCourseId}
              placeholder={"Click a course to view its details"}
            />
          </Col>
        </Row>
      )}
    </Container>
  );
}

export default Main;
