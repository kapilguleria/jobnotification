import axios from 'axios';
import { BASEURL } from './network';

const orghBaseUrl = "sales"

let token;
let id: any;

const storedData = localStorage?.getItem("user");
if (storedData !== null) {
    const data = JSON.parse(storedData);
    token = data?.token
    id = data?.data?._id
}

let user_id =  id

const headers = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }


export const getSales = async (name: string) => {
  try {
    const response = await axios.get(`${BASEURL}/${orghBaseUrl}/get?name=${name}`, headers);
    return response;
  } catch (error) {
    throw error;
  }
};

export const getSalesProjectDescription = async (content: string) => {
  try {
    const response = await axios.post(`${BASEURL}/${orghBaseUrl}/projectUnderstanding`, {content}, headers);
    return response;
  } catch (error) {
    throw error;
  }
};

export const createRSS = async (name: string, RSS: string) => {
  try {
    const response = await axios.post(`${BASEURL}/${orghBaseUrl}/create/rss`, {user_id, name, RSS }, headers);
    return response;
  } catch (error) {
    throw error;
  }
};


export const getRSS = async () => {
  try {
    const response = await axios.get(`${BASEURL}/${orghBaseUrl}/get/rss`, headers);
    return response;
  } catch (error) {
    throw error;
  }
};

export const getFeedUpdatesStore = async () => {
  try {
    const response = await axios.get(`${BASEURL}/${orghBaseUrl}/get/count/rss`, headers);
    return response;
  } catch(error) {
    throw error
  }
}