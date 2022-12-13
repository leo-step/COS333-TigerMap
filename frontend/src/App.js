import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Form from "./components/Form";
import Main from "./components/Main";
import ViewTracks from "./components/ViewTracks";
import TrackDetails from "./components/TrackDetails";
import Navbar from "./components/Navbar";
import About from "./components/About";
import NotFound from "./components/NotFound";
import Error from "./components/Error";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <Navbar />
      <div>
        <Routes>
          <Route path="/about" element={<About />} />
          <Route path="/create" element={<Form />} />
          <Route path="/tracks" element={<ViewTracks />} />
          <Route path="/track/:id" element={<TrackDetails />} />
          <Route path="/" element={<Main />} />
          <Route path="/error" element={<Error />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
