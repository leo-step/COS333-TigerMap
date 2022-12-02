import Tracks from "./Tracks";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Form() {
  const [courses, setCourses] = useState([]);
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();

    const data = {
        "title": event.target.elements.title.value,
        "emoji": event.target.elements.emoji.value,
        "courses": event.target.elements.courses.value
    };

    axios.post("http://127.0.0.1:5000/createtrack", data).then(() => {
        navigate("/tracks");
    });
  };
  return (
    <Container fluid>
      <Row className="justify-content-center">
        <form
          onSubmit={handleSubmit}
          style={{ maxWidth: "600px" }}
        >
          <div className="form-group">
            <label htmlFor="title">Title</label>
            <input
              className="form-control"
              id="title"
              name="title"
              placeholder="Enter track title"
            />
          </div>
          <div className="form-group">
            <label htmlFor="emoji">Emoji</label>
            <input className="form-control" id="emoji" name="emoji" />
          </div>
          <div className="form-group">
            <label>Add Courses</label>

            <input
              hidden
              className="form-control"
              name="courses"
              value={JSON.stringify(courses)}
            />

            <Tracks courses={courses} setCourses={setCourses}>
              {" "}
            </Tracks>
          </div>
          <button type="submit" className="btn btn-primary">
            Make Track
          </button>
        </form>
      </Row>
    </Container>
  );
}

export default Form;
