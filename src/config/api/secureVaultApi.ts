import {API_URL} from '@env';
import axios from 'axios';
import {StorageAdapter} from '../adapters/storage.adapter';

const secureVaultApi = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

secureVaultApi.interceptors.request.use(async config => {
  const token = await StorageAdapter.getItem('token');
  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`;
  }
  return config;
});

export {secureVaultApi};
