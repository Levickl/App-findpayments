import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const api = axios.create({
  baseURL: 'http://26.149.249.59:8000/api/',
  headers: {
    Accept: 'application/json',
  },
});

const setAuthorizationHeader = async () => {
  try {
    const token = await AsyncStorage.getItem('token');
     console.log("Token:", token);
    return token;
  } catch (error) {
     console.log(error);
    return null;
  }
};

const configurarApi = async () => {
  try {
    const token = await setAuthorizationHeader();


     if (token) {
       api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    }
  } catch (error) {
    // console.log(error);
  }
};

configurarApi();

export default api;
