import {useState, useEffect} from "react";
import axios from "axios";
import TrackButton from "./TrackButton"
import Container from "react-bootstrap/Container"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"

function ViewTracks() {
    const [tracks, setTracks] = useState([])

    const colors = ["#B9FBC0", "#FBF8CC", "#FDE4CF", "#FFCFD2", "#F1C0E8",
                    "#CFBAF0", "#A3C4F3", "#90DBF4", "#8EECF5", "#98F5E1"]

    useEffect(() => {
        axios
        .get("http://127.0.0.1:5000/tracks")
        .then((response) => {
          setTracks(response.data);
        });
    }, [])

    return <Container fluid style={{maxWidth: "800px"}}>
        <Row>
            {tracks.map((track, index) =>
                <Col>
                    <TrackButton track={track} color={colors[index % colors.length]} />
                </Col>
            )
            }
        </Row>
    </Container>
}

export default ViewTracks;