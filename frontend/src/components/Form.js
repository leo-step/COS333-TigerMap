import Tracks from "./Tracks";

function Form() {
    return (
        <form>
            <div className="form-group">
                <label htmlFor="title">Title</label>
                <input className="form-control" id="title" placeholder="Enter track title"/>
            </div>
            <div className="form-group">
                <label htmlFor="emoji">Emoji</label>
                <input className="form-control" id="emoji" placeholder="🍆"/>
            </div>
            <div className="form-group">
                <label>Add Courses</label>
                <Tracks></Tracks>
            </div>
            <button type="submit" className="btn btn-primary">Make Track</button>
        </form>
    );
}

export default Form;
