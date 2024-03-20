import axios from 'axios';
import { BASEURL } from './network';

const orghBaseUrl = "organisation"

let token;
let id: any;

const storedData = localStorage?.getItem("user");
if (storedData !== null) {
    const data = JSON.parse(storedData);
    token = data?.token
    id = data?.data?._id
}

const headers = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }


export const getOrganisation = async () => {
  try {
    const response = await axios.get(`${BASEURL}/${orghBaseUrl}/get/${id}`, headers);
    return response;
  } catch (error) {
    throw error;
  }
};
