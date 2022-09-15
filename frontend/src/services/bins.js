import axios from "axios"
const baseUrl = 'http://localhost:3001'

const getAll = async () => {
  const req = await axios.get(baseUrl + "/bins")
  return req.data
}

// const getBin = async (id) => {

// }

const createBin = async () => {
  const req = await axios.post("https://6e61-2600-1702-6a0-2a70-b5cd-6ad4-b9a2-8ca4.ngrok.io/api/bins")
  return req.data
}

const getRequests = async (id) => {
  const req = await axios.get(baseUrl + "/requests")
  return req.data
}

let res = {getAll, getRequests, createBin}

export default res