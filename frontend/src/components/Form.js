import Tracks from "./Tracks";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import EmojiPicker from "emoji-picker-react";
import { URL_PREFIX } from "../config";

function Form() {
  const [courses, setCourses] = useState([]);
  const [emoji, setEmoji] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();

    const data = {
      title: event.target.elements.title.value,
      emoji: event.target.elements.emoji.value,
      courses: event.target.elements.courses.value,
    };

    if (data.title !== "" && data.courses !== "[]" && courses.length >= 3) {
      axios.post(`${URL_PREFIX}/createtrack`, data).then((response) => {
        navigate("/track/" + response.data.id);
      }).catch(() => navigate("/error"));
    } else if (data.title === "") {
      alert("Please enter a title.");
    } else if (courses.length < 3) {
      alert("You need to select a minimum of 3 courses");
    } else {
      alert("Please choose at least one course.");
    }
  };
  return (
    <Container fluid className="m-2" style={{ minHeight: "950px" }}>
      <Row className="justify-content-center">
        <div style={{ textAlign: "center", maxWidth: "750px" }}>
          <h1>Create a Course Track</h1>
          <p style={{ fontSize: "24px" }}>
            A course track is a group of courses that aligns with a student's
            interest area. You can make a track for your interest area that will
            be shared with other students. Choose a title, emoji, and a set of
            courses, and we will map out all your prerequisites.{" "}
          </p>
        </div>
      </Row>
      <Row className="justify-content-center">
        <form onSubmit={handleSubmit} style={{ maxWidth: "600px" }}>
          <div className="form-group" style={{ paddingBottom: "10px" }}>
            <label htmlFor="title" style={{ fontSize: "20px" }}>
              Title
            </label>
            <input
              className="form-control"
              id="title"
              name="title"
              placeholder="Enter track title"
              maxLength="64"
            />
          </div>
          <div className="form-group" style={{ paddingBottom: "10px" }}>
            <label htmlFor="emoji" style={{ fontSize: "20px" }}>
              Emoji (Optional)
            </label>
            <h1>{emoji}</h1>
            <EmojiPicker
              width="100%"
              height="300px"
              autoFocusSearch={false}
              suggestedEmojisMode={"recent"}
              onEmojiClick={(event) => setEmoji(event.emoji)}
              previewConfig={{ showPreview: false }}
            />
            <input
              hidden
              readOnly
              className="form-control"
              id="emoji"
              name="emoji"
              value={emoji}
            />
          </div>
          <div className="form-group" style={{ paddingBottom: "10px" }}>
            <label style={{ fontSize: "20px", paddingBottom: "5px" }}>
              Add 3 to 10 Courses
            </label>

            <input
              hidden
              readOnly
              className="form-control"
              name="courses"
              value={JSON.stringify(courses)}
            />

            <Tracks courses={courses} setCourses={setCourses}>
              {" "}
            </Tracks>
          </div>
          <button
            type="submit"
            className="btn btn-primary"
            style={{ fontSize: "20px" }}
          >
            Make Track
          </button>
        </form>
      </Row>
    </Container>
  );
}

export default Form;
