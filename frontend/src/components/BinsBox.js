import { BsTrash } from "react-icons/bs"

const BinsBox = ({ bins, addBinNumber }) => {
  return (
    <div>
      {bins.map(id => {
        return (
          <div key={id} className='cloudUrl'>
           <a className="bins" href="/">
            <span className="trashCan"><BsTrash/></span>
            <p className='link' onClick={event => addBinNumber(event)}>{id}</p>
           </a>
          </div>
        )
      })}
    </div>
  )
}

export default BinsBox