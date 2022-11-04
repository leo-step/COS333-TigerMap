import { useState, useEffect } from 'react';

function App() {
    const [response, setResponse] = useState(null);
    
    useEffect(() => {
      fetch("http://127.0.0.1:5000/api", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({"course_id": "014294"}),
      })
      .then(response => response.json())
      .then(json => setResponse(JSON.stringify(json, null, 2)))
    }, []);

  return (
    <div>
      <h1>TigerMap</h1>
      <hr/>
      <pre>{response}</pre>
    </div>
  );
}

export default App;