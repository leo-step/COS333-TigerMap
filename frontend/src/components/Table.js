import Table from 'react-bootstrap/Table';

function createTable(props) {
//    const testData = [{code: "COS 126", title: "Intro to CS", area: "QR"}, {code: "COS 126", title: "Intro to CS", area: "QR"}, {code: "COS 126", title: "Intro to CS", area: "QR"}]
    
  return (
    
    <div style = {{"borderRadius": "25px", "paddingTop": "10px", "paddingBottom": "10px"}} className='m-5 myTable' >
       
      <h2 style={{"textAlign": "center"}}>
        Prerequisites
      </h2>
    <Table borderless hover>
      
      <tbody>
        {props.courses.map(function(d, idx) {
            return (
                <tr>
                    <td>{d.crosslistings}</td>
                    <td>{d.long_title}</td>
                    <td>{d.distribution_area_short}</td>
                </tr>
            )
        })}

      </tbody>
    </Table>
    </div>
  );
}

export default createTable;