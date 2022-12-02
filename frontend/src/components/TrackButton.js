import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";

function TrackButton(props) {
  const navigate = useNavigate();

  return (
    <Button
      style={{
        color: "black",
        backgroundColor: props.color,
        width: "100%",
        height: "100%",
      }}
      onClick={() => {
        navigate(props.url);
      }}
    >
      <h3>
        {props.track.title} {props.track.emoji}
      </h3>
    </Button>
  );
}

export default TrackButton;
