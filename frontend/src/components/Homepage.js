import { useState, useEffect } from 'react'
import Bins from '../services/bins.js'
import { Bin } from './Bin.js'

const Homepage = () => {
  let [bins, setBins] = useState([])
  let [binNumber, setBinNumber] = useState("")

  let addBinNumber = (event) => {
    event.preventDefault()
    setBinNumber(event.target)
  }

  useEffect(() => {
      Bins.getAll().then(bins => {
        setBins(bins)
      })
  }, [])

  let userClickedOnBin;

  (function checkIfBinIsSelected() {
    if (binNumber !== "") {
      userClickedOnBin = <Bin/>
    } else {
      userClickedOnBin = bins.map(id => {
        return (
          <div key={id}>
           <a href="/"><p onClick={event => addBinNumber(event)}>{id}</p></a>
          </div>
        )
      })
    }
  })()

  return (
    <div>
      {userClickedOnBin}
    </div>
  )
}

export default Homepage
