import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  addAdditionalField,
  addTest,
  addTestParameter,
  deleteTest,
  getAllAdditionalFields,
  getAllSubParameter,
  getParameter,
  getSubParameter,
  getTest,
  getTestAllFields,
  searchTest,
  updateTest,
  updateTestAdditionalField,
  updateTestParameter,
  updateTestSubParameter,
} from "./testAPI.js";

const initialState = {
  test: {},
  tests: [],
  testAllInfo: [],
  parameterList: [],
  subParameterList: [],
  allSubParameterList: [],
  allAdditionalFields: [],
  status: "idle",
  error: null,
  totalPages: 1,
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

export const fetchTest = createAsyncThunk("test/fetchTest", async ({ page = 11, limit = 15 }) => {
  const response = await getTest({ page, limit });
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

export const searchTestData = createAsyncThunk("test/searchTestData", async ({ search, page = 1, limit = 40 }) => {
  const response = await searchTest({ search, page, limit });
  return response;
});

// parameters
export const createTestParameter = createAsyncThunk("test/createTestParameter", async (test) => {
  const response = await addTestParameter(test);
  return response;
});
export const updateTestParameterData = createAsyncThunk("test/updateTestParameterData", async (test) => {
  const response = await updateTestParameter(test);
  return response;
});

// sub params
export const updateTestSubParameterData = createAsyncThunk("test/updateTestSubParameterData", async (test) => {
  const response = await updateTestSubParameter(test);
  return response;
});

//additional fields
export const fetchAllAdditionalFields = createAsyncThunk("test/fetchAllAdditionalFields", async (id) => {
  const response = await getAllAdditionalFields(id);
  return response;
});

export const createAdditionalFields = createAsyncThunk("test/createAdditionalFields", async (test) => {
  const response = await addAdditionalField(test);
  return response;
});

export const updateAdditionalField = createAsyncThunk("test/updateAdditionalField", async (test) => {
  const response = await updateTestAdditionalField(test);
  return response;
});

// test all info
export const fetchAllTestInfo = createAsyncThunk("test/fetchAllTestInfo", async (id) => {
  const response = await getTestAllFields(id);
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
        state.status = "success";
        state.tests = action.payload.data;
        state.totalPages = action.payload.data.totalPages;
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
        state.status = "success";
        state.tests = action.payload.data;
        state.totalPages = action.payload.data.totalPages;
      })
      .addCase(searchTestData.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })

      // test params
      .addCase(createTestParameter.pending, (state) => {
        state.status = "loading";
      })
      .addCase(createTestParameter.fulfilled, (state, action) => {
        state.status = "success";
        state.test = action.payload.data;
      })
      .addCase(createTestParameter.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(updateTestParameterData.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateTestParameterData.fulfilled, (state, action) => {
        state.status = "success";
        // state.test = action.payload.data;
      })
      .addCase(updateTestParameterData.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      // sub params
      .addCase(updateTestSubParameterData.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateTestSubParameterData.fulfilled, (state, action) => {
        state.status = "success";
        // state.test = action.payload.data;
      })
      .addCase(updateTestSubParameterData.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })

      //additional fields
      .addCase(fetchAllAdditionalFields.fulfilled, (state, action) => {
        (state.status = "success"), (state.allAdditionalFields = action.payload.data);
      })
      .addCase(createAdditionalFields.pending, (state) => {
        state.status = "loading";
      })
      .addCase(createAdditionalFields.fulfilled, (state, action) => {
        state.status = "success";
      })
      .addCase(createAdditionalFields.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })

      .addCase(updateAdditionalField.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateAdditionalField.fulfilled, (state, action) => {
        state.status = "success";
        // state.test = action.payload.data;
      })
      .addCase(updateAdditionalField.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })

      // test all info
      .addCase(fetchAllTestInfo.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchAllTestInfo.fulfilled, (state, action) => {
        (state.status = "success"), (state.testAllInfo = action.payload.data);
      })
      .addCase(fetchAllTestInfo.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default testSlice.reducer;
