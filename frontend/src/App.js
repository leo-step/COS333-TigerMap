import { useState, useEffect } from "react";
import axios from "axios";
import Table from "./components/Table"
import 'bootstrap/dist/css/bootstrap.min.css';


function App() {
  const [response, setResponse] = useState(null);
  const [courseId, setCourseId] = useState("002051");

  /* we need to change this so that you get the courseId from the url,
    and so that you can hook up the href properly */
  useEffect(() => {
    axios.get("http://127.0.0.1:5000/api", {params: {course_id: courseId}})
      .then((response) => setResponse(response.data));
  }, [courseId]);

  return (
    <Table />
  );
}

export default App;
