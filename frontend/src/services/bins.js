import axios from "axios"
const baseUrl = 'http://localhost:3001'

const getAll = async () => {
  const req = await axios.get(baseUrl + "/bins")
  return req.data
}

export default { getAll }