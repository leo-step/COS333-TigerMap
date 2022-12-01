import Tracks from "./Tracks";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import {useState} from "react";


function Form() {
     const [courses, setCourses] = useState([]);

    return (
        <Container fluid  >

            <Row className="justify-content-center" >
        <form action = "http://127.0.0.1:5000/createtrack" method = "post"
            style={{maxWidth: "600px"}}>
            <div className="form-group" >
                <label htmlFor="title">Title</label>
                <input className="form-control" id="title" name = "title" placeholder="Enter track title"/>
            </div>
            <div className="form-group">
                <label htmlFor="emoji">Emoji</label>
                <input className="form-control" id="emoji" name = "emoji" placeholder="🍆"/>
            </div>
            <div className="form-group">
                <label>Add Courses</label>

                 <input hidden className="form-control" name = "courses" value = {JSON.stringify(courses)}/>

                <Tracks courses = {courses} setCourses = {setCourses}  > </Tracks>
            </div>
            <button type="submit" className="btn btn-primary">Make Track</button>
        </form>
            </Row>
             </Container>
    );
}

export default Form;
