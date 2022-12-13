import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Table from "./Table";
import "bootstrap/dist/css/bootstrap.min.css";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import CurrentCourse from "./CurrentCourse";
import Select from "react-select";
import logo from "../images/logo.png";
import { useNavigate, useHistory } from "react-router-dom";
import { DEFAULT_SEARCH, URL_PREFIX } from "../config";

function Main() {
  const params = useParams();
  const [response, setResponse] = useState(DEFAULT_SEARCH);
  const [courseId, setCourseId] = useState(params.id);
  const [query, setQuery] = useState(null);
  const [data, setData] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    if (query) {
      axios
        .get(`${URL_PREFIX}/search`, { params: { query: query } })
        .then((response) => {
          let result = response.data;
          for (let i = 0; i < result.length; i++) {
            result[i].label =
              result[i].crosslistings + " - " + result[i].long_title;
            result[i].value =
              result[i].crosslistings.replaceAll(" ", "").replaceAll("/", " ") +
              " - " +
              result[i].long_title;
          }
          setResponse(result);
        }).catch(() => navigate("/error"));
    }
  }, [query]);

  useEffect(() => {
    if (courseId) {
      axios
        .get(`${URL_PREFIX}/api`, { params: { course_id: courseId } })
        .then((response) => {
          setData(response.data);
        }).catch(() => navigate("/notfound"));
    }
  }, [courseId]);

  return (
    <Container fluid style={{ maxWidth: "1600px" }}>
      <Row className="justify-content-center">
        <div style={{ textAlign: "center", maxWidth: "800px" }}>
          <div style={{ marginLeft: "auto", marginRight: "auto", maxWidth: "500px" }}>
            <img src={logo} alt="TigerMap" style={{ maxWidth: "100%"}} />
          </div>
          <p style={{ fontSize: "24px" }}>
            Course selection can feel like a treasure hunt with no destination.
            TigerMap helps you find the way to the courses you want to take in
            the future. 🗺️{" "}
          </p>
        </div>
      </Row>
      <Row className="justify-content-center">
        <div style={{ maxWidth: "720px" }}>
          <p style={{ fontSize: "20px" }} onClick={() => setQuery(null)}>
            <Select
              onInputChange={(val) => {
                setQuery(val);
              }}
              onChange={(event) => {
                setCourseId(event._id);
                navigate(`/${event._id}`);
              }}
              options={response}
              placeholder="Search for a prerequisite in your major"
              className="m-2"
              value={query}
              noOptionsMessage={() =>
                "No results found. Try adding a space if you have a course code."
              }
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
              header={"Prerequisites"}
              setCourseId={setCourseId}
              courses={data.prereqs}
              placeholder={
                (data.prereqs.length > 0 &&
                  "Click a course to view its details.") ||
                "This course has no prerequisites."
              }
              colorPlaceholder
            />
          </Col>
          <Col>
            <Table
              header={"This course is required for..."}
              setCourseId={setCourseId}
              courses={data.postreqs}
              placeholder={
                (data.postreqs.length > 0 &&
                  "Click a course to view its details.") ||
                "This course isn't required for any classes."
              }
              colorPlaceholder
            />
          </Col>
        </Row>
      )) || (
        <Row>
          <Col>
            <Table
              header={"Prerequisites"}
              setCourseId={setCourseId}
              placeholder={"Search for a course to view its prerequisites."}
              colorPlaceholder
            />
          </Col>
          <Col>
            <Table
              header={"This course is required for..."}
              setCourseId={setCourseId}
              placeholder={"Search for a course to see what it is required for."}
              colorPlaceholder
            />
          </Col>
        </Row>
      )}
    </Container>
  );
}

export default Main;
