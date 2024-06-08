import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { addDepartment, deleteDepartment, getDepartments, searchDepartment, updateDepartment } from "./departmentAPI";

const initialState = {
  department: {},
  departments: [],
  status: "idle",
  error: null,
  totalPages: 1,
};

export const fetchDepartment = createAsyncThunk("department/fetchDepartment", async ({ page, limit }) => {
  const response = await getDepartments({ page, limit });
  return response;
});

export const createDepartment = createAsyncThunk("department/createDepartment", async (department) => {
  const response = await addDepartment(department);
  return response;
});

export const updateDepartmentData = createAsyncThunk("department/updateDepartmentData", async (department) => {
  const response = await updateDepartment(department);
  return response;
});

export const deleteDepartmentData = createAsyncThunk("department/deleteDepartmentData", async (id) => {
  const response = await deleteDepartment(id);
  return response;
});
export const searchDepartmentData = createAsyncThunk("patient/searchDepartmentData", async ({ search, page, limit }) => {
  const response = await searchDepartment({ search, page, limit });
  return response;
});

export const departmentSlice = createSlice({
  name: "department",
  initialState,
  reducers: {
    // resetDepartment: (state) => {
    //   state.department = {};
    // },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchDepartment.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchDepartment.fulfilled, (state, action) => {
        state.status = "success";
        state.departments = action.payload.data;
        state.totalPages = action.payload.data.totalPages;
      })
      .addCase(fetchDepartment.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(createDepartment.pending, (state) => {
        state.status = "loading";
      })
      .addCase(createDepartment.fulfilled, (state, action) => {
        state.status = "success";
      })
      .addCase(updateDepartmentData.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateDepartmentData.fulfilled, (state, action) => {
        state.status = "success";
      })
      .addCase(deleteDepartmentData.pending, (state) => {
        state.status = "loading";
      })
      .addCase(deleteDepartmentData.fulfilled, (state, action) => {
        state.status = "success";
      })
      .addCase(searchDepartmentData.pending, (state) => {
        state.status = "loading";
      })
      .addCase(searchDepartmentData.fulfilled, (state, action) => {
        state.status = "success";
        state.patients = action.payload.data;
        state.totalPages = action.payload.data.totalPages;
      })
      .addCase(searchDepartmentData.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default departmentSlice.reducer;
