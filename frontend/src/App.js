import { useState, useEffect } from 'react';

function App() {
    const [response, setResponse] = useState(null);
    const [courseId, setCourseId] = useState("014294");
    
    useEffect(() => {
      fetch("http://127.0.0.1:5000/api", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({"course_id": courseId}),
      })
      .then(response => response.json())
      .then(json => setResponse(json))
    }, [courseId]);

  return (
    <div>
      <h1>TigerMap</h1>
      <hr/>
      <h2>{response && response.crosslistings} - {response && response.transcript_title}</h2>
      <p>{response && response.description}</p>
      <p><b>Requirements:</b> {response && response.other_restrictions}</p>
      <p><b>Prerequisites:</b> {response && response.prereqs.map(prereq => <div><a href="#">{prereq}</a><br/></div>)}</p>
      <button onClick={() => setCourseId("001397")}>Switch</button>
      <hr/>
      <h2>Details</h2>
      <pre>{JSON.stringify(response, null, 2)}</pre>
    </div>
  );
}

export default App;