import Bins from './services/bins.js'

const homepage = () => {
  let data = Bins.getAll()
  console.log(data)
  return (
    <div>
      <h1>Bins</h1>
    </div>
  )
}

export default homepage