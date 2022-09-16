import "bootstrap/dist/css/bootstrap.min.css"
import { BsFillCloudDrizzleFill } from 'react-icons/bs'

const PageHeader = ({ createBinHandler, setBinNumber }) => {
  let homeBtnHandler = () => {
    setBinNumber("")
  }

  return (
    <div className="headingBox">
      <div className="heading">
        <span className="cloud"><BsFillCloudDrizzleFill onClick={homeBtnHandler}/></span>
        <h1>Request Cloud</h1>
        <p>A cloud to hold all of your HTTP requests</p>
        <button className="custom-btn" onClick={createBinHandler}>Create a new cloud</button>
      </div>
    </div>
  )
}

export default PageHeader