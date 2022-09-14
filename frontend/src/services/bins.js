import axios from "axios"
const baseUrl = 'http://localhost:3001'

const getAll = async () => {
  const req = await axios.get(baseUrl + "/bins")
  return req.data
}

// const getBin = async (id) => {

// }

const getRequests = async (id) => {
  const req = await axios.get(baseUrl + "/requests")
  return req.data
}

let res = {getAll, getRequests}

export default res