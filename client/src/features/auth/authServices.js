import axios from "axios";

const USER_API = "/api/users";

const signup = async (user) => {
  console.log("inside signup");
  const response = await axios.post(USER_API + "/signup", user);
  console.log(response.data);
  if (response.data) {
    localStorage.setItem("user", JSON.stringify(response.data));
  }
  return response.data;
};

const signin = async (user) => {
  const response = await axios.post(USER_API + "/login", user);
  if (!response.data) {
    throw new Error("login failed");
  }
  localStorage.setItem("user", JSON.stringify(response.data));
  return response.data;
};

const logout = async () => {
  return localStorage.removeItem("user");
};

const authServices = {
  signup,
  logout,
  signin,
};

export default authServices;
