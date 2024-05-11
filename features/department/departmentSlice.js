import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { addDepartment, deleteDepartment, getDepartments, updateDepartment } from "./departmentAPI";

const initialState = {
  department: {},
  departments: [],
  status: "idle",
  error: null,
};

export const fetchDepartment = createAsyncThunk("department/fetchDepartment", async () => {
  const response = await getDepartments();
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
        (state.status = "success"), (state.departments = action.payload.data);
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
      });
  },
});

export default departmentSlice.reducer;
