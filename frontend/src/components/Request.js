import FormParams from "./FormParams"
import Headers from "./Headers"
import RawBody from "./RawBody"

const Request = ({ req }) => {
  return (
    <div className="requestBox">
      <FormParams req={req}/>
      <Headers info={req.headers}/>
      <RawBody body={req.body}/>
      <hr></hr>
    </div>
  )
}

export default Request