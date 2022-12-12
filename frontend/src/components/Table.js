import Table from "react-bootstrap/Table";

function createTable(props) {
  return (
    <div
      style={{
        borderRadius: "25px",
        paddingTop: "10px",
        paddingBottom: "10px",
      }}
      className="m-4 myTable"
    >
      <h2 style={{ textAlign: "center" }}>{props.header}</h2>
      {props.placeholder && (
        <div
          style={{
            textAlign: "center",
            fontSize: "20px",
            paddingBottom: "10px",
          }}
        >
          <i>
            {props.placeholder}{" "}
            {props.showLinks && (
              <span>
                You can either{" "}
                <a href="/tracks" className="orange-color">
                  browse more tracks
                </a>{" "}
                or{" "}
                <a href="/" className="orange-color">
                  go to the home page
                </a>
                .
              </span>
            )}
          </i>
        </div>
      )}
      {props.courses && (
        <Table borderless hover>
          <tbody>
            {props.courses.map(function (course) {
              return (
                <tr
                  key={course._id}
                  onClick={() => {
                    props.setCourseId(course._id);
                  }}
                  style={{ fontSize: "20px" }}
                >
                  <td>{course.crosslistings}</td>
                  <td>{course.long_title}</td>
                  <td>{course.distribution_area_short}</td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      )}
    </div>
  );
}

export default createTable;
