import Button from 'react-bootstrap/Button'
import "bootstrap/dist/css/bootstrap.min.css"

const PageHeader = ({ createBinHandler }) => {
  return (
    <div className="headingBox">
      <div className="heading">
        <h1>Request Box</h1>
        <p>A box to hold all your HTTP requests</p>
        <Button className="custom-btn" onClick={createBinHandler}>Create a new bin</Button>
      </div>
    </div>
  )
}

export default PageHeader