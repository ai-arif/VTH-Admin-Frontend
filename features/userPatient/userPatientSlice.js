import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getAllUserPatient, searchUserPatient } from "./userPatientAPI";

const initialState = {
  userPatients: [],
  status: "idle",
  error: null,
  totalPages: 1,
};

export const fetchAllUserPatient = createAsyncThunk("userPatient/fetchAllUserPatient", async ({ page = 1, limit = 15 }) => {
  const response = await getAllUserPatient({ page, limit });
  return response;
});

export const searchUserPatientAsync = createAsyncThunk("userPatient/searchUserPatientAsync", async ({ search, page = 1, limit = 40 }) => {
  const response = await searchUserPatient({ search, page, limit });
  return response;
});

export const userPatientSlice = createSlice({
  name: "userPatient",
  initialState,
  reducers: {
    resetUserPatient: (state) => {
      state.userPatient = {};
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllUserPatient.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchAllUserPatient.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.userPatients = action.payload.data.users;
        state.totalPages = action.payload.data.totalPages;
      })
      .addCase(fetchAllUserPatient.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(searchUserPatientAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(searchUserPatientAsync.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.userPatients = action.payload.data.users;
        state.totalPages = action.payload.data.totalPages;
      })
      .addCase(searchUserPatientAsync.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const { resetUserPatient } = userPatientSlice.actions;

export default userPatientSlice.reducer;
