import { BsTrash } from "react-icons/bs"
import Bins from '../services/bins.js'

const BinsBox = ({ bins, handler, addBinNumber }) => {
  let removeBinHandler = (event) => {
    event.preventDefault()

    let currentPath = event.currentTarget.nextSibling.textContent
    let filteredBins = bins.filter(id => id !== currentPath)

    Bins.deleteBin(currentPath).then(status => {
      handler(filteredBins)
    })
  }

  return (
    <div>
      {bins.map(id => {
        return (
          <div key={id} className='cloudUrl'>
           <a className="bins" href="/">
            <span className="trashCan" onClick={(event) => {removeBinHandler(event)}}><BsTrash/></span>
            <p className='link' onClick={event => addBinNumber(event)}>{id}</p>
           </a>
          </div>
        )
      })}
    </div>
  )
}

export default BinsBox