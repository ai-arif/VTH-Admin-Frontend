import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getTest,addTest, addParameter } from "./testAPI.js";


const initialState = {
  test: {},
  tests: [],
  status: "idle",
  error: null,
  parameterStatus:'idle'
};

export const fetchTest = createAsyncThunk("test/fetchTest", async () => {
  const response = await getTest();
  return response;
});




export const createTest = createAsyncThunk("test/createTest", async (test) => {
  const response = await addTest(test);
  return response;
});




export const createParameter = createAsyncThunk("test/createParameter", async (test) => {
  const response = await addParameter()
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
      })
      .addCase(createTest.pending, (state) => {
        state.status = "loading";
      })
      .addCase(createTest.fulfilled, (state, action) => {
        state.status = "success";
        state.test = action.payload.data;
      })
      .addCase(createTest.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
    
  },
});

export default testSlice.reducer;
