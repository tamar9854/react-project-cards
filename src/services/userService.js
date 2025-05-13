import httpService from "./httpService";
import { jwtDecode } from "jwt-decode";

const TOKEN_KEY = "token";

async function logIn(values) {
  const response = await httpService.post("/users/login", values);
  return response;
}

function signUp(values) {
  return httpService.post("/users", values);
}
function getUser(userId) {
  const token = getToken();
  return httpService.get(`/users/${userId}`, {
    headers: { "x-auth-token": token },
  });
}

function toggleUserType(userId) {
  const token = getToken();

  return httpService.patch(`/users/${userId}`, null, {
    headers: { "x-auth-token": token },
  });
}

function setToken(token) {
  localStorage.setItem(TOKEN_KEY, token);
}
const getToken = () => {
  const TOKEN_KEY = "token";

  return localStorage.getItem(TOKEN_KEY);
};
function getTokenData() {
  try {
    const jwt = localStorage.getItem(TOKEN_KEY);
    const data = jwtDecode(jwt);
    return data;
  } catch (err) {
    return null;
  }
}

function logOut() {
  setToken(null);
}

async function getAllUsers() {
  const token = getToken();
  return httpService.get(`/users`, {
    headers: { "x-auth-token": token },
  });
}

async function deleteUser(userId) {
  const token = getToken();
  return httpService.delete(`/users/${userId}`, {
    headers: { "x-auth-token": token },
  });
}

const userService = {
  logIn,
  signUp,
  logOut,
  setToken,
  getTokenData,
  getToken,
  getUser,
  getAllUsers,
  toggleUserType,
  deleteUser,
};

export default userService;
