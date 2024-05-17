import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { addTest,searchTest, deleteTest, getAllSubParameter, getParameter, getSubParameter, getTest, searchTest, updateTest } from "./testAPI.js";

const initialState = {
  test: {},
  tests: [],
  parameterList: [],
  subParameterList: [],
  allSubParameterList: [],
  status: "idle",
  error: null,
};

export const fetchAllSubParameter = createAsyncThunk("test/fetchSubParameterAll", async (id) => {
  const response = await getAllSubParameter();
  return response;
});

export const fetchSubParameter = createAsyncThunk("test/fetchSubParameter", async (id) => {
  const response = await getSubParameter(id);
  return response;
});

export const fetchParameter = createAsyncThunk("test/fetchParameter", async (id) => {
  const response = await getParameter(id);
  return response;
});

export const fetchTest = createAsyncThunk("test/fetchTest", async () => {
  const response = await getTest();
  return response;
});

export const createTest = createAsyncThunk("test/createTest", async (test) => {
  const response = await addTest(test);
  return response;
});

export const updateTestData = createAsyncThunk("test/updateTestData", async (test) => {
  const response = await updateTest(test);
  return response;
});

export const deleteTestData = createAsyncThunk("test/deleteTestData", async (id) => {
  const response = await deleteTest(id);
  return response;
});

export const searchTestData = createAsyncThunk("test/searchTestData", async (search,page=1,limit=20) => {
  const response = await searchTest(search,page,limit);
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
        (state.status = "success"), (state.tests = action.payload.data);
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
      .addCase(fetchParameter.fulfilled, (state, action) => {
        (state.status = "success"), (state.parameterList = action.payload.data);
      })
      .addCase(fetchSubParameter.fulfilled, (state, action) => {
        (state.status = "success"), (state.subParameterList = action.payload.data);
      })
      .addCase(fetchAllSubParameter.fulfilled, (state, action) => {
        (state.status = "success"), (state.allSubParameterList = action.payload.data);
      })
      .addCase(updateTestData.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateTestData.fulfilled, (state, action) => {
        state.status = "success";
        state.test = action.payload.data;
      })
      .addCase(updateTestData.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(deleteTestData.pending, (state) => {
        state.status = "loading";
      })
      .addCase(deleteTestData.fulfilled, (state, action) => {
        state.status = "success";
        state.test = action.payload.data;
      })
      .addCase(deleteTestData.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(searchTestData.pending, (state) => {
        state.status = "loading";
      })
      .addCase(searchTestData.fulfilled, (state, action) => {
        (state.status = "success"), (state.tests = action.payload.data);
      })
      .addCase(searchTestData.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default testSlice.reducer;
