import { api } from './api';

export const login = (data) => {
  const url = `/login`; 
  return api.post(url, data);
}

export const loginGoogle = (data)=>{
  const url ='/redirectGoogleOAuth2';
  return api.post(url,data);
}
