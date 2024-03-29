import { useState, useEffect } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Select from "react-select";
import Badge from "react-bootstrap/Badge";
import { TrashFill } from "react-bootstrap-icons";
import { useNavigate } from "react-router-dom";
import { DEFAULT_SEARCH, URL_PREFIX } from "../config";

function Tracks(props) {
  const [response, setResponse] = useState(DEFAULT_SEARCH);
  const [courseId, setCourseId] = useState(null);
  const [query, setQuery] = useState(null);
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
    if (
      courseId &&
      !props.courses.map((course) => course._id).includes(courseId)
    ) {
      if (props.courses.length >= 10) {
        props.setCourses(props.courses.slice(0, 10))
        alert("You can only select a maximum of 10 courses.");
      } else {
        axios
          .get(`${URL_PREFIX}/api`, { params: { course_id: courseId } })
          .then((response) => {
            props.setCourses([...props.courses, response.data]);
          }).catch(() => navigate("/error"));
      }
    }
  }, [courseId]);

  return (
    <Container fluid style={{ maxWidth: "1600px" }}>
      <Row className="justify-content-center">
        <div style={{ maxWidth: "800px", padding: "0px" }} onClick={() => setQuery(null)}>
          {/*<img src={logo} alt="TigerMap" style={{ maxWidth: "100%" }}/>*/}
          <Select
              onInputChange={(val) => {
                setQuery(val);
              }}
              onChange={(event) => {
                setCourseId(event._id);
              }}
              options={response}
              placeholder="Search for a class you are interested in"
              className="mb-2"
              value={query}
              noOptionsMessage={() =>
                "No results found. Try adding a space if you have a course code."
              }
            />
        </div>
      </Row>
      <div style={{ marginTop: "5px" }}>
        {props.courses.map((course, index) => (
          <Badge
            key={index}
            bg="secondary"
            style={{
              marginTop: "5px",
              marginBottom: "5px",
              marginRight: "17px",
              marginLeft: "-12px",
              fontSize: "16px",
            }}
          >
            <TrashFill
              className="trash"
              style={{ marginRight: "8px" }}
              onClick={() => {
                props.setCourses(props.courses.filter((item) => item._id !== course._id));
                setCourseId(null);
              }}
            />
            {course.crosslistings + " - " + course.long_title}
          </Badge>
        ))}
      </div>
    </Container>
  );
}

export default Tracks;
