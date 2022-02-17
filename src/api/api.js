import axios from "axios";
axios.defaults.baseURL = 'http://backend-api-01.newbee.ltd/api/v1/';
const instance = axios.create({
  timeout: 25000,
});

// 请求拦截
instance.interceptors.request.use(
  (config) => {
    return config;

  },
  (error) => {
    return Promise.reject(error);
  }
);

// 响应拦截
instance.interceptors.response.use(
  (response) => {
    if (response.status == 200) {
      return Promise.resolve(response);
    } else {
        Toast.fail('求错误，请联系管理员');
      return Promise.reject(response);
    }
  },
  (error) => {
    Toast.fail('求错误，请联系管理员');
    return Promise.reject(error.response);
  }
);

export default instance;




