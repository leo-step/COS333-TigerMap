import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Form from "./components/Form";
import Main from "./components/Main";
import ViewTracks from "./components/ViewTracks";
import TrackDetails from "./components/TrackDetails";

import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/createtrack" element={<Form />} />
          <Route path="/tracks" element={<ViewTracks />} />
          <Route path="/track/:id" element={<TrackDetails />} />
          <Route path="/" element={<Main />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
