import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import goalServices from "./goalServices";
import axios from "axios";

const initialState = {
  goals: [],
  isLoading: false,
  isError: false,
  isSuccess: false,
  message: "",
};

export const getGoals = createAsyncThunk(
  "goals/getGoals",
  async (_, thunkAPI) => {
    const { token } = thunkAPI.getState().auth.user;
    try {
      const goals = await goalServices.getGoals(token);
      return thunkAPI.fulfillWithValue(goals);
    } catch (err) {
      console.log(err);
      return thunkAPI.rejectWithValue(err);
    }
  }
);

export const createGoal = createAsyncThunk(
  "goals/createGoal",
  async (goal, thunkAPI) => {
    const { token } = thunkAPI.getState().auth.user;
    try {
      const res = await axios.post("/api/goals/", goal, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log("res.data: ", res.data);
      return thunkAPI.fulfillWithValue(res.data);
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || error.message || error.toString()
      );
    }
  }
);

export const deleteGoal = createAsyncThunk(
  "goals/deleteGoal",
  async (_id, thunkAPI) => {
    const { token } = thunkAPI.getState().auth.user;
    try {
      const deletedGoal = await goalServices.deleteGoal(_id, token);
      return thunkAPI.fulfillWithValue(deletedGoal);
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || error.message || error.toString()
      );
    }
  }
);

const goalSlice = createSlice({
  name: "goals",
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getGoals.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getGoals.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.goals = action.payload;
      })
      .addCase(getGoals.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(createGoal.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createGoal.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.goals.push(action.payload);
      })
      .addCase(createGoal.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(deleteGoal.fulfilled, (state, action) => {
        state.goals = state.goals.filter(
          (goal) => goal._id !== action.payload._id
        );
      });
  },
});

export const { reset } = goalSlice.actions;
export default goalSlice.reducer;
