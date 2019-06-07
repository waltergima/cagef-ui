import axios from "axios";
import jwt from "jsonwebtoken";
import { userFake } from "./userFake";

let header: any;
if (window.sessionStorage.getItem("auth_token")) {
  header = {
    headers: {
      "Content-Type": "application/json",
      authorization: window.sessionStorage.getItem("auth_token")
    }
  };
} else {
  header = {
    headers: {
      "Content-Type": "application/json",
      authorization: process.env.REACT_APP_API_TOKEN
    }
  };
}

class magaRequest {
  constructor() { }

  get(endpoint: string, modelName: any = {}) {
    return new Promise((resolve, reject) => {
      axios
        .get(endpoint, header)
        .then(response => {
          treatSuccess(response, resolve);
        })
        .catch(error => {
          treatException(error, modelName, resolve, reject);
        });
    });
  }
  post(endpoint: string, body: any = {}, modelName: any = {}) {
    return new Promise((resolve, reject) => {
      axios
        .post(endpoint, body, header)
        .then(response => {
          treatSuccess(response, resolve);
        })
        .catch(error => {
          treatException(error, modelName, resolve, reject);
        });
    });
  }
  put(endpoint: string, body: any = {}, modelName: any = {}) {
    return new Promise((resolve, reject) => {
      axios
        .put(endpoint, body, header)
        .then(response => {
          treatSuccess(response, resolve);
        })
        .catch(error => {
          treatException(error, modelName, resolve, reject);
        });
    });
  }
  patch(endpoint: string, body: any = {}, modelName: any = {}) {
    return new Promise((resolve, reject) => {
      axios
        .patch(endpoint, body, header)
        .then(response => {
          treatSuccess(response, resolve);
        })
        .catch(error => {
          treatException(error, modelName, resolve, reject);
        });
    });
  }
  delete(endpoint: string, modelName: any = {}) {
    return new Promise((resolve, reject) => {
      axios
        .delete(endpoint, header)
        .then(response => {
          treatSuccess(response, resolve);
        })
        .catch(error => {
          treatException(error, modelName, resolve, reject);
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

export default new magaRequest();
