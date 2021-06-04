import axios from 'axios';

const instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_REAL_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  validateStatus: (status: number) => {
    return status < 400;
  },
});

// Alter defaults after instance has been created
instance.interceptors.request.use(
  config => {
    if (process.browser) {
      const token = localStorage.getItem('token');
      // eslint-disable-next-line no-param-reassign
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  error => {
    // Do something with request error
    return Promise.reject(error);
  },
);

const createAxiosResponseInterceptor = () => {
  const interceptor = instance.interceptors.response.use(
    response => response,
    error => {
      // Reject promise if usual error
      if (error.response.status !== 401) {
        return Promise.reject(error);
      }

      /*
       * When response code is 401, try to refresh the token.
       * Eject the interceptor so it doesn't loop in case
       * token refresh causes the 401 response
       */
      instance.interceptors.response.eject(interceptor);

      return instance
        .post('/api/auth/refresh_token', {
          refresh_token: localStorage.getItem('refresh_token'),
        })
        .then(response => {
          localStorage.setItem('token', response.data.tokens.accessToken);
          localStorage.setItem(
            'refresh_token',
            response.data.tokens.accessToken,
          );
          // eslint-disable-next-line no-param-reassign
          error.response.config.headers.Authorization = `Bearer ${response.data.tokens.accessToken}`;
          return instance(error.response.config);
        })
        .catch(finalError => {
          localStorage.removeItem('token');
          localStorage.removeItem('refresh_token');
          window.location.href = '/login';
          return Promise.reject(finalError);
        })
        .finally(createAxiosResponseInterceptor);
    },
  );
};
createAxiosResponseInterceptor();

export default instance;
