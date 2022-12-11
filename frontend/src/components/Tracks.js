import { useState, useEffect } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Select from "react-select";



function Tracks(props) {
    const [response, setResponse] = useState([]);
    const [courseId, setCourseId] = useState(null);
    const [query, setQuery] = useState(null);
    const [data, setData] = useState(null);


  
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
            setResponse(result);
          });
      }
    }, [query]);
  
    useEffect(() => {
        if (courseId) {
          axios
            .get("http://127.0.0.1:5000/api", { params: { course_id: courseId } })
            .then((response) => {

              props.setCourses([...props.courses, response.data])

            } ) ;
        }
      }, [courseId]);


    useEffect(() => {
        console.log(props.courses)
      }, [props.courses]);

  
    return (
      <Container fluid style={{maxWidth: "1600px"}}>
        <Row className="justify-content-center">
          <div style={{ maxWidth: "800px" , padding: '0px'}}>
            {/*<img src={logo} alt="TigerMap" style={{ maxWidth: "100%" }}/>*/}
            <Select
              onInputChange={(val) => setQuery(val)}
              onChange={(event) => {
                setCourseId(event._id);
              }}
              options={response}
              placeholder="Search"
              className="mb-2"
              
            />
          </div>
        </Row>

          <div>
      {props.courses.map((course, index) => (
        <p  key={index}> {course.long_title} </p>
      ))}
    </div>



      </Container>
    );
  }
  
  export default Tracks;