import Button from 'react-bootstrap/Button';

function TrackButton(props) {
    return <Button style={{color: "black", backgroundColor: props.color}}>
        <h3>{props.track.title} {props.track.emoji}</h3>
    </Button>
}

export default TrackButton;