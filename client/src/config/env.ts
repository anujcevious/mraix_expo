
const env = {
  API_BASE_URL: import.meta.env.VITE_API_BASE_URL || window.location.origin,
  API_TIMEOUT: 15000,
  AUTH_TOKEN_KEY: 'auth_token',
};

export default env;
