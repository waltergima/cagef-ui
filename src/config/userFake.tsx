import jwt from "jsonwebtoken";
import _ from "lodash";

export const userData = () => {
  let userData: any =
    process.env.NODE_ENV === "development" || process.env.NODE_ENV === "test"
      ? userFake().userData
      : window.sessionStorage.getItem("auth_userData");
  let userName = null;
  let firstName = null;
  let fullName = null;
  if (userData) {
    userData = jwt.decode(userData);
    userName = userData.login.toLowerCase();
    firstName = _.capitalize(userData.name.split(" ")[0]);
    fullName = _.startCase(_.toLower(userData.name));
  }
  return {
    userName: userName,
    firstName: firstName,
    fullName: fullName
  };
};

export const defineLink = (currentLink: string) => {
  return process.env.NODE_ENV === "development"
    ? `http://localhost:3000${currentLink}`
    : currentLink;
};

export const userFake = () => {
  const auth = {
    token:
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.tuloTp8hjMRrVVr84_6oBf1Ojd1gtbHYDkMai8j37sw",
    userData:
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImpvaG5kb2VAZ21haWwuY29tIiwicm9sZSI6IlJPTEVfQURNSU4iLCJjaXR5IjoiUmlvIGRlIEphbmVpcm8ifQ.ZzRN3iBixZRVwUpAsS2tva6-YkPOd05tbuiTR7cdou4"
  };
  if (process.env.NODE_ENV !== "test") {
    window.sessionStorage.setItem("auth_token", auth.token);
    window.sessionStorage.setItem("auth_userData", auth.userData);
  }
  return auth;
};