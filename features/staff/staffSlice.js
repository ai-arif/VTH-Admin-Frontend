import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { addStaff, deleteStaff, getStaffs, searchStaff, updateStaff } from "./staffAPI";

const initialState = {
  staffs: [],
  staff: {},
  status: "idle",
  error: null,
  totalPages: 1,
};

export const fetchStaffs = createAsyncThunk("staff/fetchStaffs", async ({ page = 1, limit = 15 }) => {
  const response = await getStaffs({ page, limit });
  return response;
});

export const deleteStaffData = createAsyncThunk("staff/deleteStaffData", async (id) => {
  const response = await deleteStaff(id);
  return response;
});

export const createStaff = createAsyncThunk("staff/createStaff", async (data) => {
  const response = await addStaff(data);
  return response;
});

export const updateStaffData = createAsyncThunk("staff/updateStaffData", async (data) => {
  const response = await updateStaff(data);
  return response;
});

export const searchStaffData = createAsyncThunk("staff/searchStaffData", async ({ search, page = 1, limit = 15 }) => {
  const response = await searchStaff({ search, page, limit });
  return response;
});

export const staffSlice = createSlice({
  name: "staff",
  initialState,
  reducers: {
    resetStaff: (state) => {
      state.staff = {};
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchStaffs.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchStaffs.fulfilled, (state, action) => {
        state.status = "success";
        state.staffs = action.payload.data;
        state.totalPages = action.payload.data.totalPages;
      })
      .addCase(fetchStaffs.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(createStaff.pending, (state) => {
        state.status = "loading";
      })
      .addCase(createStaff.fulfilled, (state, action) => {
        state.status = "success";
        state.staff = action.payload.data;
      })
      .addCase(createStaff.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(updateStaffData.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateStaffData.fulfilled, (state, action) => {
        state.status = "success";
        state.staff = action.payload.data;
      })
      .addCase(updateStaffData.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(deleteStaffData.pending, (state) => {
        state.status = "loading";
      })
      .addCase(deleteStaffData.fulfilled, (state, action) => {
        state.status = "success";
      })
      .addCase(searchStaffData.pending, (state) => {
        state.status = "loading";
      })
      .addCase(searchStaffData.fulfilled, (state, action) => {
        state.status = "success";
        state.staffs = action.payload.data;
        state.totalPages = action.payload.data.totalPages;
      })
      .addCase(searchStaffData.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const { resetStaff } = staffSlice.actions;

export default staffSlice.reducer;
