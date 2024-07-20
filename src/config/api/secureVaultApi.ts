import {API_URL} from '@env';
import axios from 'axios';

const secureVaultApi = axios.create({
  baseURL: API_URL,
});

//TODO interceptors

export {secureVaultApi};
