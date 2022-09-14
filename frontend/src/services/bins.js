import axios from "axios"
const baseUrl = 'api/bins'

const getAll = async () => {
  const req = await axios.get(baseUrl)
  return req.data
}

export default getAll