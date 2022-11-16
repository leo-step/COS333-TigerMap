import Table from 'react-bootstrap/Table';

function createTable() {
    const testData = [{code: "COS 126", title: "Intro to CS", area: "QR"}, {code: "COS 126", title: "Intro to CS", area: "QR"}, {code: "COS 126", title: "Intro to CS", area: "QR"}]
    
  return (
    
    <div style = {{"borderRadius": "25px", "paddingTop": "10px", "paddingBottom": "10px"}} className='m-5 myTable' >
       
      <h2 style={{"textAlign": "center"}}>
        Prerequisites
      </h2>
    <Table borderless hover>
      
      <tbody>
        {testData.map(function(d, idx) {
            return (
                <tr>
                    <td>{d.code}</td>
                    <td>{d.title}</td>
                    <td>{d.area}</td>
                </tr>
            )
        })}

      </tbody>
    </Table>
    </div>
  );
}

export default createTable;