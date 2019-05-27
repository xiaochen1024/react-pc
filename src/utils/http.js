import axios from "axios";
import { message } from "antd";
import queryString from "query-string";

import storage from "utils/storage";
import { LOGIN_INFO } from "constants";

axios.defaults.timeout = 5000;
axios.defaults.baseURL = process.env.REACT_APP_API_URL;
axios.defaults.headers.common.Accept = "application/json";
axios.defaults.headers.post["Content-Type"] =
  "application/x-www-form-urlencoded";

function normalizeContentyType(headers) {
  const contentType = headers && headers["Content-Type"];
  return contentType || "application/x-www-form-urlencoded";
}

axios.interceptors.request.use(
  config => {
    const loginInfo = JSON.parse(storage.getItem(LOGIN_INFO)) || {};
    const token = loginInfo.token;
    if (token) {
      config.headers.token = `${token}`;
    } else {
      delete config.headers.token;
    }
    return config;
  },
  error => Promise.reject(error)
);

axios.interceptors.response.use(
  response => {
    const { code, msg } = response.data;
    if (code !== 0) {
      message.error(msg);
      if (code === 5002) {
        window.location.href = "/login";
        return;
      }
      return Promise.reject(response.data);
    }

    return response.data;
  },
  error => {
    if (error.response && error.request) {
      if (error.response.status === 504) {
        message.error("连接超时");
      }
      return Promise.reject(error);
    }
  }
);

export function get(url, params, config) {
  config = Object.assign({}, config);
  return axios.get(url, { params }, config);
}

export function post(url, params, config) {
  config = Object.assign({}, config);
  const contentType = normalizeContentyType(config.headers);

  switch (contentType) {
    case "application/x-www-form-urlencoded":
      params = queryString.stringify(params);
      break;
    case "application/json":
      params = JSON.stringify(params);
      break;
    default:
      break;
  }

  return axios.post(url, params, config);
}

export function put(url, params = {}, config) {
  config = Object.assign({}, config);
  return axios.put(url, queryString.stringify(params), config);
}
