import Button from "react-bootstrap/Button";
import { useState } from "react";

function CurrentCourse(props) {
  const [collapse, setCollapse] = useState(false);

  if (props.details == null) {
    return (
      <div
        style={{
          borderRadius: "25px",
          paddingLeft: "10px",
          paddingRight: "10px",
          paddingTop: "50px",
          paddingBottom: "50px",
        }}
        className="m-4 myTable"
      >
        <p
          style={{ textAlign: "center", fontSize: "24px", marginBottom: "0px" }}
          className="orange-no-hover"
        >
          <i>The course details will appear here.</i>
        </p>
      </div>
    );
  } else {
    return (
      <div
        style={{ borderRadius: "25px", padding: "10px" }}
        className="m-4 myTable"
      >
        <h2 style={{ textAlign: "center", paddingBottom: "10px" }}>
          <span className="btn-main title">{props.details.crosslistings}: {props.details.long_title}</span>
          <a
            href={`https://registrar.princeton.edu/course-offerings/course-details?term=${props.details.term}&courseid=${props.details._id}`}
            target="_blank"
            rel="noreferrer"
            className="btn-main"
          >
            <Button className="btn-main btn-orange">Course Offerings</Button>
          </a>
          <a
            href={`https://www.princetoncourses.com/course/${props.details.term}${props.details._id}`}
            target="_blank"
            rel="noreferrer"
            className="btn-main"
          >
            <Button className="btn-main btn-green">Course Evaluations</Button>
          </a>
          <span className="btn-main">
            <Button onClick={() => setCollapse(!collapse)}>
              {(!collapse && "Collapse") || "Uncollapse"}
            </Button>
          </span>
        </h2>
        <span hidden={collapse}>
          <p>
            <b>Description: </b>
            {props.details.description}
          </p>
          <p>
            <b>Reading/Writing Assignments: </b>
            {props.details.reading_writing_assignment || "N/A"}
          </p>
          <p>
            <b>Prerequisites and Restrictions: </b>
            {props.details.other_restrictions || "N/A"}
          </p>
          <p>
            <b>Distribution Areas:</b>{" "}
            {props.details.distribution_area_short || "N/A"}
          </p>
        </span>
      </div>
    );
  }
}

export default CurrentCourse;
