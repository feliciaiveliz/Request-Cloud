const Headers = ({info}) => {
  return (
    <div>
      <b><h4>Headers</h4></b>
      {Object.keys(info).map((key, idx) => {
        return (
          <p key={key+idx}>{key}: {info[key]}</p>
        )
      })}
    </div>
  )
}

export default Headers