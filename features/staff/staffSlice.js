import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { addStaff, getAllStaffs, getStaffs, updateStaffs } from "./staffAPI";

const initialState = {
  staffs: [],
  staff: {},
  status: "idle",
  error: null,
};

export const fetchStaffs = createAsyncThunk("staff/fetchStaffs", async () => {
  console.log("okkkk");
  const response = await getStaffs();
  return response;
});

export const fetchAllStaffs = createAsyncThunk("staff/fetchAllStaffs", async () => {
  const response = await getAllStaffs();
  return response;
});

export const createStaff = createAsyncThunk("staff/createStaff", async (data) => {
  const response = await addStaff(data);
  return response;
});

export const updateStaff = createAsyncThunk("staff/updateStaff", async (data) => {
  const response = await updateStaffs(data);
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
      .addCase(fetchAllStaffs.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchAllStaffs.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.staffs = action.payload.data;
      })
      .addCase(fetchAllStaffs.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(createStaff.pending, (state) => {
        state.status = "loading";
      })
      .addCase(createStaff.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.staff = action.payload.data;
      })
      .addCase(createStaff.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(updateStaff.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateStaff.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.staff = action.payload.data;
      })
      .addCase(updateStaff.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

// export const { resetStaff } = staffSlice.actions;

export default staffSlice.reducer;
