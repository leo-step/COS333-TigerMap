import Table from 'react-bootstrap/Table';

function createTable() {
    const testData = [{code: "COS 126", title: "Intro to CS", area: "QR"}, {code: "COS 126", title: "Intro to CS", area: "QR"}, {code: "COS 126", title: "Intro to CS", area: "QR"}]
    
  return (
    <Table striped bordered hover>
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
  );
}

export default createTable;