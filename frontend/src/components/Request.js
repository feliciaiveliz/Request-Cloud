const Request = ({ req }) => {
  return (
    <div>
      {Object.keys(req.headers).map((key, idx) => {
        return (
          <p key={key+idx}>{key}: {req.headers[key]}</p>
        )
      })}
    </div>
  )
}

export default Request