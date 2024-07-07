import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { deleteIncomingTest, getIncomingTest, getSingleIncomingTest, searchIncomingTest } from "./incomingTestAPI";

const initialState = {
  incomingTest: {},
  incomingTests: [],
  status: "idle",
  error: null,
  totalPages: 1,
};

export const fetchAllIncomingTest = createAsyncThunk("incomingTest/fetchAllIncomingTest", async ({ page = 1, limit = 15 }) => {
  const response = await getIncomingTest({ page, limit });
  return response;
});

// fetch single test
export const fetchSingleIncomingTest = createAsyncThunk("medicine/fetchSingleIncomingTest", async (id) => {
  const response = await getSingleIncomingTest(id);
  return response;
});

export const deleteIncomingTestData = createAsyncThunk("incomingTest/deleteIncomingTestData", async (id) => {
  const response = await deleteIncomingTest(id);
  return response;
});

export const searchIncomingTestData = createAsyncThunk("incomingTest/searchIncomingTestData", async ({ search, page = 1, limit = 40 }) => {
  const response = await searchIncomingTest({ search, page, limit });
  return response;
});

export const incomingTestSlice = createSlice({
  name: "incomingTest",
  initialState,
  reducers: {
    // resetUserPatient: (state) => {
    //   state.incomingTest = {};
    // },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllIncomingTest.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchAllIncomingTest.fulfilled, (state, action) => {
        state.status = "success";
        state.incomingTests = action.payload.data;
        state.totalPages = action.payload.data.totalPages;
      })
      .addCase(fetchAllIncomingTest.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(fetchSingleIncomingTest.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchSingleIncomingTest.fulfilled, (state, action) => {
        (state.status = "success"), (state.incomingTest = action.payload.data);
      })
      .addCase(fetchSingleIncomingTest.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(deleteIncomingTestData.pending, (state) => {
        state.status = "loading";
      })
      .addCase(deleteIncomingTestData.fulfilled, (state) => {
        state.status = "success";
      })
      .addCase(deleteIncomingTestData.rejected, (state, action) => {
        state.status = "failed";
      })
      .addCase(searchIncomingTestData.pending, (state) => {
        state.status = "loading";
      })
      .addCase(searchIncomingTestData.fulfilled, (state, action) => {
        state.status = "success";
        state.incomingTests = action.payload.data;
        state.totalPages = action.payload.data.totalPages;
      })
      .addCase(searchIncomingTestData.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const { resetUserPatient } = incomingTestSlice.actions;

export default incomingTestSlice.reducer;
