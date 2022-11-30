

function Tracks() {
    const [response, setResponse] = useState([]);
    const [courses, setCourses] = useState([]);
    const [courseId, setCourseId] = useState(null);
    const [query, setQuery] = useState(null);
    const [data, setData] = useState(null);
  
    useEffect(() => {
      if (query) {
        axios
          .get("/search", { params: { query: query } })
          .then((response) => {
            let result = response.data;
            for (let i = 0; i < result.length; i++) {
              result[i].label =
                result[i].crosslistings + " - " + result[i].long_title;
              result[i].value = result[i]._id;
            }
            setResponse(result);
          });
      }
    }, [query]);
  
    useEffect(() => {
        if (courseId) {
          axios
            .get("/api", { params: { course_id: courseId } })
            .then((response) => {
              setCourses(...courses, response.data)
            });
        }
      }, [courseId]);
  
    return (
      <Container fluid style={{maxWidth: "1600px"}}>
        <Row className="justify-content-center">
          <div style={{ maxWidth: "500px" }}>
            <img src={logo} alt="TigerMap" style={{ maxWidth: "100%" }}/>
            <Select
              onInputChange={(val) => setQuery(val)}
              onChange={(event) => {
                setCourseId(event._id);
              }}
              options={response}
              placeholder="Search"
              className="m-2"
            />
          </div>
        </Row>
      </Container>
    );
  }
  
  export default Tracks;