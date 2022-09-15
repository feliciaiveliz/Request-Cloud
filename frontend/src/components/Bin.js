import { useEffect, useState } from "react"
import Bins from "../services/bins"
import Request from './Request'
import BinInfo from "./BinInfo"

const Bin = ( { binId } ) => {
  let [requests, setRequests] = useState([])
  let [binInfo, setBinInfo] = useState([])

  useEffect(() => {
    Bins.getRequests(binId).then((reqs) => {
      setBinInfo(reqs[0])
      setRequests(reqs[1])
    })
  }, [binId])

  return (
    <div>
      <BinInfo info={binInfo}/>
      {requests.map((req, idx) => {
        return (
          <Request key={req.method+idx} req={req}/>
        )
      })}
    </div>
  )
}

export {
  Bin,
}