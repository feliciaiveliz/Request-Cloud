const BinInfo = ({ info }) => {
  return (
    <div className="binInfo">
      <p>HTTP</p>
      <p>Url: {`https://api.mattmalane.dev/target/${info.path}`}</p>
      <p>Date Created: {info["date_created"]}</p>
      <p>Date Last Updated: {info["date_last_updated"]}</p>
    </div>
  )
}

export default BinInfo