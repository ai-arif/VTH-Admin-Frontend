import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { addTest, deleteTest, getTest, updateTest } from "./testAPI.js";

const initialState = {
  test: {},
  tests: [],
  parameterList: [],
  subParameterList:[],
  status: "idle",
  error: null,
};


export const fetchSubParameter = createAsyncThunk(
  "test/fetchSubParameter",
  async (id) => {
    const response = await getSubParameter(id)
    return response;
  }
);


export const fetchParameter = createAsyncThunk(
  "test/fetchParameter",
  async (id) => {
    const response = await getParameter(id);
    return response;
  }
);


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
        state.status = "success",
         state.parameterList = action.payload.data
      })
      .addCase(fetchSubParameter.fulfilled, (state, action) => {
        state.status = "success",
        state.subParameterList = action.payload.data
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
      });
  },
});

export default testSlice.reducer;
