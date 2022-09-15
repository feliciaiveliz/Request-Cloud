import { useState, useEffect } from 'react'
import Bins from '../services/bins.js'
import { Bin } from './Bin.js'
import PageHeader from './PageHeader.js'
import "../App.css"

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
      userClickedOnBin = <Bin binId={binNumber}/>
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

  const createBinHandler = async () => {
    const path = await Bins.createBin()
    setBinNumber(path)
    console.log(path)
  }

  return (
    <div>
      <PageHeader createBinHandler={createBinHandler}/>
      <div>
        {userClickedOnBin}
      </div>
    </div>
  )
}

export default Homepage
