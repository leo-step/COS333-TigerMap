import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Table from "./Table";
import axios from "axios";
import Container from "react-bootstrap/esm/Container";
import Row from "react-bootstrap/esm/Row";
import graph from "../images/graph.png";

function TrackDetails() {
  const params = useParams();
  const [track, setTrack] = useState(null);

  useEffect(() => {
    axios
      .get("http://127.0.0.1:5000/trackdetails", { params: { id: params.id } })
      .then((response) => {
        setTrack(response.data);
      });
  }, [params]);

  return (
    <Container fluid style={{ maxWidth: "1200px" }}>
      <Row className="justify-content-center">
        {track && (
          <Table
            header={track.title + " " + track.emoji}
            courses={track.courses}
          />
        )}
      </Row>
      <Row>
        {track && <img src={graph} alt="graph" style={{ maxWidth: "100%" }} />}
      </Row>
    </Container>
  );
}

export default TrackDetails;
