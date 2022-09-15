import axios from "axios"
const baseUrl = 'https://646d-47-153-153-72.ngrok.io/api'

const getAll = async () => {
  const req = await axios.get(baseUrl + "/bins")
  return req.data
}

const createBin = async () => {
  const req = await axios.post(baseUrl + "/bins")
  return req.data
}

const getRequests = async (id) => {
  const req = await axios.get(baseUrl + `/bins/${id}`)
  return req.data
}

let res = {getAll, getRequests, createBin}

export default res