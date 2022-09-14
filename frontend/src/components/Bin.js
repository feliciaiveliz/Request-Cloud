import { useEffect, useState } from "react"
import Bins from "../services/bins"
import Request from './Request'

const Bin = ( { binId } ) => {
  let [requests, setRequests] = useState([])

  useEffect(() => {
    Bins.getRequests().then((reqs) => {
      setRequests(reqs)
    })
  }, [])

  return (
    <div>
      {requests.map((req, idx) => {
        return (
          <Request key={req.method+idx} req={req} />
        )
      })}
    </div>
  )
}

export {
  Bin,
}