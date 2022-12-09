import axios from "axios";
const GOALS_API = "/api/goals";

axios.defaults.headers.common = {};

const deleteGoal = async (_id, token) => {
  const response = await axios.delete(`${GOALS_API}/${_id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

const getGoals = async (token) => {
  try {
    const res = await axios.get(GOALS_API + "/", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log(res.data);
    return res.data;
  } catch (err) {
    throw new Error(
      err.response?.data?.message || err.message || err.toString()
    );
  }
};

const createGoal = async (token, goal) => {
  console.log("entered createGoal service");
  try {
    console.log("entered createGoal service try");
    const res = await axios.post(GOALS_API + "/", goal, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (!res.data) {
      throw new Error("goal creation failed.");
    }
    console.log("createGoal service data obtained");
    return res.data;
  } catch (err) {
    console.log("entered error in service");
    throw new Error(
      err.response?.data?.message || err.message || err.toString()
    );
  }
};

export default {
  deleteGoal,
  getGoals,
  createGoal,
};
