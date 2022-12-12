import Tracks from "./Tracks";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import EmojiPicker from "emoji-picker-react";

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

    if (data.title !== "" && data.courses !== "[]") {
      axios.post("http://127.0.0.1:5000/createtrack", data).then((response) => {
        navigate("/track/" + response.data.id);
      });
    } else if (data.title === "") {
      alert("Please enter a title.");
    } else {
      alert("Please choose at least one course.");
    }
  };
  return (
    <Container fluid className="m-2">
      <Row className="justify-content-center">
        <div style={{ textAlign: "center", maxWidth: "800px"  }}>
            <h1>Create a Course Track</h1>
            <p style={{ fontSize: "24px" }}>
              Make a course track by choosing a title, a suitable emoji, and a
              set of courses. We will map out all your prerequisites.{" "}
            </p>
        </div>
      </Row>
      <Row className="justify-content-center">
        <form onSubmit={handleSubmit} style={{ maxWidth: "600px" }}>
          <div className="form-group" style={{ paddingBottom: "10px" }}>
            <label htmlFor="title">Title</label>
            <input
              className="form-control"
              id="title"
              name="title"
              placeholder="Enter track title"
              maxlength="64"
            />
          </div>
          <div className="form-group" style={{ paddingBottom: "10px" }}>
            <label htmlFor="emoji">Emoji (Optional)</label>
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
            <label>Add Courses</label>

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
          <button type="submit" className="btn btn-primary">
            Make Track
          </button>
        </form>
      </Row>
    </Container>
  );
}

export default Form;
