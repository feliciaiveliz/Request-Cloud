import axios from "axios"

const baseUrl = 'https://localhost:3001/api'

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

const deleteBin = async (id) => {
  const req = await axios.delete(`${baseUrl}/bins/${id}`)
  return req.data.status
}

let res = {getAll, getRequests, createBin, deleteBin}

export default res