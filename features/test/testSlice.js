import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getTest } from "./testAPI.js";
const initialState = {
  test: {},
  tests: [],
  status: "idle",
  error: null,
};

export const fetchTest = createAsyncThunk("test/fetchTest", async () => {
  const response = await getTest();
  return response;
});

export const testSlice = createSlice({
  name: "test",
  initialState,
  reducers: {
    // resetTest: (state) => {
    //   state.test = {};
    // },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTest.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchTest.fulfilled, (state, action) => {
        state.status = "success",
        state.tests = action.payload.data
      })
      .addCase(fetchTest.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default testSlice.reducer;
