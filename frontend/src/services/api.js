import axios from 'axios';

export const api=axios.create({baseURL:import.meta.env.VITE_API_BASE_URL||'http://localhost:5000/api/v1',withCredentials:true,timeout:10000});
let accessToken=null;
let refreshPromise=null;

export function setAccessToken(token){accessToken=token||null;}
export function clearAccessToken(){accessToken=null;}

api.interceptors.request.use(config=>{
  if(accessToken) config.headers.Authorization=`Bearer ${accessToken}`;
  return config;
});

api.interceptors.response.use(response=>response,async(error)=>{
  const config=error.config||{};
  if(error.response?.status!==401 || config._retry || config.url?.includes('/auth/')) throw error;
  config._retry=true;
  refreshPromise=refreshPromise||api.post('/auth/refresh').finally(()=>{refreshPromise=null;});
  const response=await refreshPromise;
  setAccessToken(response.data.data.accessToken);
  config.headers.Authorization=`Bearer ${response.data.data.accessToken}`;
  return api(config);
});
