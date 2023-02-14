import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";

function TrackButton(props) {
  const navigate = useNavigate();

  return (
    <Button
      className="track-button"
      style={{
        color: "black",
        backgroundColor: props.color,
        width: "100%",
        height: "100%",
        minWidth: "100px",
        minHeight: "100px",
      }}
      onClick={() => {
        navigate(props.url);
      }}
    >
      <h3>
        {props.track.title} {props.track.emoji}
      </h3>
      <p>Created by: {props.track.netid}</p>
    </Button>
  );
}

export default TrackButton;
