import RequestInfo from "./RequestInfo"
import FormParams from "./FormParams"
import Headers from "./Headers"
import RawBody from "./RawBody"

const Request = ({ req }) => {
  return (
    <div>
      <RequestInfo req={req}/>
      <FormParams req={req}/>
      <Headers info={req.headers}/>
      <RawBody body={req["raw body"]}/>
    </div>
  )
}

export default Request