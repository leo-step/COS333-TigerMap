import { useState, useEffect } from "react";
import axios from "axios";
import TrackButton from "./TrackButton";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

function ViewTracks() {
  const [tracks, setTracks] = useState([]);

  const colors = [
    "#B9FBC0",
    "#FBF8CC",
    "#FDE4CF",
    "#FFCFD2",
    "#F1C0E8",
    "#CFBAF0",
    "#A3C4F3",
    "#90DBF4",
    "#8EECF5",
    "#98F5E1",
  ];

  useEffect(() => {
    axios.get("http://127.0.0.1:5000/gettracks").then((response) => {
      setTracks(response.data);
    });
  }, []);

  return (
    <Container fluid className="mt-2" style={{ maxWidth: "900px" }}>
      <Row>
        <div style={{ textAlign: "center" }}>
          <h1>Browse Course Tracks</h1>
          <p style={{fontSize: "24px"}}>
            Below are user created course tracks. Click any track to view the
            courses in it. To create your own track ad share it with others,
            click on Create Track!{" "}
          </p>
        </div>
        {tracks.map((track, index) => (
          <Col className="m-1 justify-content-center">
            <TrackButton
              track={track}
              color={colors[index % colors.length]}
              url={"/track/" + track._id}
            />
          </Col>
        ))}
      </Row>
    </Container>
  );
}

export default ViewTracks;
