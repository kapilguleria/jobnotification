import axios from 'axios';
import { BASEURL } from './network';

const authBaseUrl = "auth"

interface signUpProps {
    email: string;
    password: string;
}

export const signup = async ({ email, password }: signUpProps) => {
  try {
    const response = await axios.post(`${BASEURL}/${authBaseUrl}/register`, { email, password });
    return response;
  } catch (error) {
    throw error;
  }
};

export const verifyOtp = async (otp: string, email: string) => {
  try {
    const response = await axios.post(`${BASEURL}/${authBaseUrl}/verifyOtp`, {email, otp});
    return response;
  }catch(error) {
    throw error;
  }
}

export const resendOtp = async (email: string) => {
  try {
    const response = await axios.post(`${BASEURL}/${authBaseUrl}/resendOtp`, {email});
    return response
  }catch(error) {
    throw error;
  }
}

export const login = async ({email, password}: signUpProps) => {
  try {
    const response = await axios.post(`${BASEURL}/${authBaseUrl}/signIn`, { email, password });
    return response;
  } catch (error) {
    throw error;
  }
}