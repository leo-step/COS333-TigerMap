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
        <div style={{ textAlign: "center", fontSize: "20px", paddingBottom: "10px" }}>
          <i>Click a course to view its details</i>
        </div>
        {props.courses && <Table borderless hover>
          <tbody>
            {props.courses.map(function (course) {
              return (
                <tr
                  key={course._id}
                  onClick={() => {
                    props.setCourseId(course._id);
                  }}
                >
                  <td>{course.crosslistings}</td>
                  <td>{course.long_title}</td>
                  <td>{course.distribution_area_short}</td>
                </tr>
              );
            })}
          </tbody>
        </Table>}
    </div>
  );
}

export default createTable;
