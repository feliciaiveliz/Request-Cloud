import { useState, useEffect } from 'react'
import Bins from '../services/bins.js'
import { Bin } from './Bin.js'
import PageHeader from './PageHeader.js'
import "../App.css"
import BinsBox from './BinsBox.js'

const Homepage = () => {
  let [bins, setBins] = useState([])
  let [binNumber, setBinNumber] = useState("")

  let addBinNumber = (event) => {
    event.preventDefault()
    setBinNumber(event.target.textContent)
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
      userClickedOnBin = (<div className='binsBox'><h2>Your clouds</h2><div className='urlBox'><BinsBox bins={bins} addBinNumber={addBinNumber} handler={setBins}/></div></div>)
    }
  })()

  const createBinHandler = async () => {
    const path = await Bins.createBin()
    setBinNumber(path)
  }

  return (
    <div>
      <PageHeader createBinHandler={createBinHandler} setBinNumber={setBinNumber}/>
      <div>
        {userClickedOnBin}
      </div>
    </div>
  )
}

export default Homepage
