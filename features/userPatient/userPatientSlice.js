import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getAllUserPatient, searchUserPatient } from "./userPatientAPI";

const initialState = {
  userPatients: [],
  status: "idle",
  error: null,
  currentPage: 1,
  totalPages: 1,
};

export const fetchAllUserPatient = createAsyncThunk("userPatient/fetchAllUserPatient", async ({ page, limit }) => {
  const response = await getAllUserPatient(page, limit);
  return response;
});

export const searchUserPatientAsync = createAsyncThunk("userPatient/searchUserPatientAsync", async ({ search, page, limit }) => {
  const response = await searchUserPatient(search, page, limit);
  return response;
});

export const userPatientSlice = createSlice({
  name: "userPatient",
  initialState,
  reducers: {
    resetUserPatient: (state) => {
      state.userPatient = {};
    },
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload;
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

export const { resetUserPatient, setCurrentPage } = userPatientSlice.actions;

export default userPatientSlice.reducer;
