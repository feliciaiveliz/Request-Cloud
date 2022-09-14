const Headers = ({info}) => {
  return (
    <div>
      <h1>Headers</h1>
      {Object.keys(info).map((key, idx) => {
        return (
          <p key={key+idx}>{key}: {info[key]}</p>
        )
      })}
    </div>
  )
}

export default Headers