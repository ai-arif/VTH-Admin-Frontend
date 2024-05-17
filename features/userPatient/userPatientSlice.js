import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { getAllUserPatient, searchUserPatient } from "./userPatientAPI";

const initialState = {
  userPatient: {},
  userPatients: [],
  status: "idle",
  error: null,
};

export const fetchAllUserPatient = createAsyncThunk("userPatient/fetchAllUserPatient", async () => {
  const response = await getAllUserPatient();
  return response;
});

export const searchUserPatientAsync = createAsyncThunk("userPatient/searchUserPatientAsync", async (search) => {
  const response = await searchUserPatient(search);
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
        state.userPatients = action.payload.data;
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
        state.userPatients = action.payload.data;
      })
      .addCase(searchUserPatientAsync.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const { resetUserPatient } = userPatientSlice.actions;

export default userPatientSlice.reducer;
