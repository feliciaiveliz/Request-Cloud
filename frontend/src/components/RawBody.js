const RawBody = ({ body }) => {
  return (
    <div>
      <b><h4>Raw Body</h4></b>
      <p>{JSON.stringify(body)}</p>
    </div>
  )
}

export default RawBody