export const env = {
    dev: 'dev',
    production: 'production',
  };
  export const currentEnv = process.env.REACT_APP_ENV || env.dev;
  
  export const API_URL = {
    dev: 'http://127.0.0.1:8000/api/v1',
    production: 'https://api-talents01.hblab.dev/api/v1'
  };
  export const BASE_API_URL = API_URL[currentEnv];