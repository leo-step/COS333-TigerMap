import {useState, useEffect} from "react";
import axios from "axios";
import TrackButton from "./TrackButton"

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

    return <div>
        {tracks.map((track, index) =>
            <TrackButton track={track} color={colors[index % colors.length]}/>)}
    </div>
}

export default ViewTracks;