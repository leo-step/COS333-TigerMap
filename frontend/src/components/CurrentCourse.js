import Button from "react-bootstrap/Button";

function CurrentCourse(props) {
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
        >
          The course details will appear here.
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
          {props.details.crosslistings}: {props.details.long_title}
          <a
            href={`https://registrar.princeton.edu/course-offerings/course-details?term=${props.details.term}&courseid=${props.details._id}`}
            target="_blank"
            rel="noreferrer"
          >
            <Button className="btn-orange">Course Offerings</Button>
          </a>
          <a
            href={`https://www.princetoncourses.com/course/${props.details.term}${props.details._id}`}
            target="_blank"
            rel="noreferrer"
          >
            <Button className="btn-green">Course Evaluations</Button>
          </a>
        </h2>
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
      </div>
    );
  }
}

export default CurrentCourse;
