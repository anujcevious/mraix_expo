
const env = {
  API_BASE_URL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000',
  API_TIMEOUT: 15000,
  AUTH_TOKEN_KEY: 'auth_token',
};

export default env;
