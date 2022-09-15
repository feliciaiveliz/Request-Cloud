import axios from "axios"
const baseUrl = 'http://localhost:3001'

const getAll = async () => {
  const req = await axios.get(baseUrl + "/bins")
  return req.data
}

// const getBin = async (id) => {

// }

const createBin = async () => {
  const req = await axios.get(baseUrl + "/requests")
  return req.data
}

const getRequests = async (id) => {
  const req = await axios.get(baseUrl + "/requests")
  console.log(req.data, "here")
  return req.data
}

let res = {getAll, getRequests, createBin}

export default res