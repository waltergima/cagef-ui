import jwt from "jsonwebtoken";
export const userData = () => {
    let userData: any = window.sessionStorage.getItem("auth_userData");
    let userName = null;
    let role = null;
    let city = null;
    if (userData) {
        userData = jwt.decode(userData);
        userName = userData.sub;
        role = userData.ROLE;
        city = userData.city;
    }
    return {
        userName: userName,
        role: role,
        city: city
    };
};

export const hasRole = (role = 'ROLE_ADMIN'): boolean => {
    let userData: any = window.sessionStorage.getItem("auth_userData");
    if (userData) {
        userData = jwt.decode(userData);
        return (userData.ROLE === role);
    }
    return false;
}