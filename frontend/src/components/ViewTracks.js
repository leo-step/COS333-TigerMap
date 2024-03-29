import { useState, useEffect } from "react";
import axios from "axios";
import TrackButton from "./TrackButton";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { useNavigate } from "react-router-dom";
import { URL_PREFIX } from "../config";

function ViewTracks() {
  const [tracks, setTracks] = useState([]);
  const navigate = useNavigate();

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
    axios.get(`${URL_PREFIX}/gettracks`).then((response) => {
      setTracks(response.data);
    }).catch(() => navigate("/error"));
  }, []);

  return (
    <Container fluid className="mt-2" style={{ maxWidth: "900px" }}>
      <Row>
        <div style={{ textAlign: "center", marginBottom: 12 }}>
          <h1>Browse Course Tracks</h1>
          <p style={{ fontSize: "24px" }}>
            Below are user created course tracks. A course track is a group of
            courses that aligns with a student's interest area. Click any track
            to view the courses in it. To create your own track and share it with
            others, click on <a href="/create" className="orange-color">Create Track!</a>{" "}
          </p>
          <i>
              These course tracks are not vetted or approved by the University.
          </i>
        </div>
        {tracks.map((track, index) => (
          <Col className="m-1 justify-content-center" key={index}>
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
