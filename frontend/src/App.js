import logo from './logo.svg';
import './App.css';
import { useState} from 'react';

function App() {
  const [response, setResponse] = useState("Hi");



  return (
    <div className="App">
      {response}
    </div>
  );
}

export default App;
