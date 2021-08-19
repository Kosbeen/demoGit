const lsTokenKey = "my_app_token";

function setTokenOnLogin(res) {
  const isLoginUrl = res.url.includes("login");
  if (isLoginUrl) {
    const token = res.data.token;
    localStorage.setItem(lsTokenKey, token);
  }
  return res;
}

function getClearRespose(res) {
  return res.data;
}

function onError(err) {
  console.dir(err);
  return Promise.reject(err);
}

function setToken(req) {
  const isAuthUrl = req.config.url.includes("auth");

  if (!isAuthUrl) {
    const token = localStorage.getItem(isTokenKey);
    req.header["x-access-token"] = token;
  }
  return req;
}

export default function (axios) {
  axios.interceptors.request.use(setToken);
  axios.interceptors.response.use(setTokenOnLogin);
  axios.interceptors.response.use(getClearRespose, onError);
}
