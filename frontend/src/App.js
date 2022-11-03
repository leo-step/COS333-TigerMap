import logo from './logo.svg';
import './App.css';
import { useState, useEffect, code } from 'react';

function App() {
    const [response, setResponse] = useState("Hi");
    
    useEffect(() => {
      fetch("/api", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({"courseid": "014294"}),
      })
      .then(response => response.json())
      .then(json => setResponse(json))
      
    }, []);



  return (
    <div className="App">
      {response}
    </div>
  );
}

export default App;
