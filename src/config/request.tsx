import axios from "axios";
import jwt from "jsonwebtoken";

class magaRequest {

  get(endpoint: string, modelName: any = {}) {
    return new Promise((resolve, reject) => {
      return refreshToken().then(() => {
        axios
          .get(endpoint, getHeaders())
          .then(response => {
            treatSuccess(response, resolve);
          })
          .catch(error => {
            treatException(error, modelName, resolve, reject);
          });
      });
    });
  }
  post(endpoint: string, body: any = {}, modelName: any = {}) {
    return new Promise((resolve, reject) => {
      return refreshToken().then(() => {
        axios
          .post(endpoint, body, getHeaders())
          .then(response => {
            treatSuccess(response, resolve);
          })
          .catch(error => {
            treatException(error, modelName, resolve, reject);
          });
      });
    });
  }
  put(endpoint: string, body: any = {}, modelName: any = {}) {
    return new Promise((resolve, reject) => {
      return refreshToken().then(() => {
        axios
          .put(endpoint, body, getHeaders())
          .then(response => {
            treatSuccess(response, resolve);
          })
          .catch(error => {
            treatException(error, modelName, resolve, reject);
          });
      });
    });
  }
  patch(endpoint: string, body: any = {}, modelName: any = {}) {
    return new Promise((resolve, reject) => {
      return refreshToken().then(() => {
        axios
          .patch(endpoint, body, getHeaders())
          .then(response => {
            treatSuccess(response, resolve);
          })
          .catch(error => {
            treatException(error, modelName, resolve, reject);
          });
      });
    });
  }
  delete(endpoint: string, modelName: any = {}) {
    return new Promise((resolve, reject) => {
      return refreshToken().then(() => {
        axios
          .delete(endpoint, getHeaders())
          .then(response => {
            treatSuccess(response, resolve);
          })
          .catch(error => {
            treatException(error, modelName, resolve, reject);
          });
      });
    });
  }
}

const treatSuccess = (response: any, resolve: any) => {
  response.headers.authorization &&
    window.sessionStorage.setItem("auth_token", response.headers.authorization);
  resolve(response);
};

const treatException = (
  error: any,
  modelName: string,
  resolve: any,
  reject: any
) => {
  if (error) {
    if (error.response.status === 401 || error.response.status === 403) {
      // NavStore.redirect = true;
      window.sessionStorage.removeItem("auth_token");
      window.sessionStorage.removeItem("auth_userData");

      window.location.href = `${process.env.REACT_APP_PUBLIC_URL}/login?expired=true`;
    } else {
      reject(error);
    }
    reject(error);
  } else {
    try {
      error.response.headers.authorization &&
        window.sessionStorage.setItem(
          "token",
          error.response.headers.authorization
        );
      reject(error.response.data);
    } catch (err) {
      reject(err);
    }
  }
};

const refreshToken = async () => {
  let token = window.sessionStorage.getItem("auth_token");
  if (token) {
    const userData: any = jwt.decode(token.replace('Bearer ', ''));
    if (userData) {
      let difference = new Date(userData.exp * 1000).getMinutes() - (new Date().getMinutes());

      if (difference >= 0 && difference < 3) {
        let { headers: response } = await axios.post(`${process.env.REACT_APP_API_URL}/auth/refresh_token`, null, getHeaders());
        window.sessionStorage.setItem("auth_userData", response.authorization.replace('Bearer ', ''));
        window.sessionStorage.setItem("auth_token", response.authorization);
      }
    }
  }
}

const getHeaders = () => {
  if (window.sessionStorage.getItem("auth_token")) {
    return {
      headers: {
        "Content-Type": "application/json",
        authorization: window.sessionStorage.getItem("auth_token")
      }
    };
  }

  return {
    headers: {
      "Content-Type": "application/json",
      authorization: process.env.REACT_APP_API_TOKEN
    }
  };

}

export default new magaRequest();
