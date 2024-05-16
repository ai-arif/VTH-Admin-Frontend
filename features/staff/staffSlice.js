import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { addStaff, deleteStaff, getStaffs, searchStaff, updateStaff } from "./staffAPI";

const initialState = {
  staffs: [],
  staff: {},
  status: "idle",
  error: null,
};

export const fetchStaffs = createAsyncThunk("staff/fetchStaffs", async () => {
  const response = await getStaffs();
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

export const searchStaffData = createAsyncThunk("staff/searchStaffData", async (search) => {
  const response = await searchStaff(search);
  return response;
});

export const staffSlice = createSlice({
  name: "staff",
  initialState,
  reducers: {
    // resetStaff: (state) => {
    //   state.staff = {};
    // },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchStaffs.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchStaffs.fulfilled, (state, action) => {
        (state.status = "success"), (state.staffs = action.payload.data);
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
        (state.status = "success"), (state.patients = action.payload.data);
      })
      .addCase(searchStaffData.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

// export const { resetStaff } = staffSlice.actions;

export default staffSlice.reducer;
