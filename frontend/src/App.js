import { useState, useEffect } from "react";
import axios from "axios";

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
    <div>
      <h1>TigerMap</h1>
      <hr />
      <h2>
        {response && response.crosslistings} -{" "}
        {response && response.transcript_title}
      </h2>
      <p>{response && response.description}</p>
      <b>Requirements:</b> {response && response.other_restrictions}
      <p><b>Prerequisites:</b>
        {response &&
          response.prereqs.map((prereq) => (
            <div key={prereq}>
              <a href="#" onClick={() => setCourseId("002054")}>
                {prereq}
              </a>
              <br />
            </div>
          ))}
      </p>
      <hr />
      <h2>Details</h2>
      <pre>{JSON.stringify(response, null, 2)}</pre>
    </div>
  );
}

export default App;
