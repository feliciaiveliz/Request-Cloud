const RequestInfo = ({ req }) => {
  // need to add content type and content length(bytes)
  // need to also add time sent
  return (
    <div>
      <small>HTTP</small>
      <p>{req.method}</p>
    </div>
  )
}

export default RequestInfo