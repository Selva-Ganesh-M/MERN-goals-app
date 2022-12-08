import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import authServices from "./authServices";

const storedUser = JSON.parse(localStorage.getItem("user"));

const initialState = {
  user: storedUser ? storedUser : null,
  isLoading: false,
  isError: false,
  isSuccess: false,
  message: "",
};

export const register = createAsyncThunk(
  "auth/register",
  async (user, thunkAPI) => {
    console.log("inside register");
    try {
      console.log("inside try");
      return await authServices.signup(user);
    } catch (error) {
      const message =
        error.response?.data?.message || error.message || error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const signin = createAsyncThunk(
  "auth/signin",
  async (user, { rejectWithValue }) => {
    try {
      const response = await authServices.signin(user);
      return response;
    } catch (err) {
      const value =
        err.response?.data?.message || err.message || err.toString();
      return rejectWithValue(value);
    }
  }
);

export const logout = createAsyncThunk("auth/logout", async () => {
  return await authServices.logout();
});

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false;
      state.isError = false;
      state.isSuccess = false;
      state.message = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(register.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.user = action.payload;
      })
      .addCase(register.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(signin.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(signin.rejected, (state, action) => {
        state.isError = true;
        state.isLoading = false;
        state.message = action.payload;
      })
      .addCase(signin.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.user = action.payload;
      })
      .addCase(logout.fulfilled, (state) => {
        state.user = null;
      });
  },
});

export const { reset } = authSlice.actions;
export default authSlice.reducer;
