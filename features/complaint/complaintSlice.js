import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { addComplaint, deleteComplaint, getComplaint, searchComplaint, updateComplaint } from "./complaintAPI";

const initialState = {
  complaint: {},
  complaints: [],
  status: "idle",
  error: null,
  totalPages: 1,
};

export const fetchComplaint = createAsyncThunk("complaint/fetchComplaint", async ({ page = 1, limit = 15 }) => {
  const response = await getComplaint({ page, limit });
  return response;
});

export const createComplaint = createAsyncThunk("complaint/createComplaint", async (complaint) => {
  const response = await addComplaint(complaint);
  return response;
});

export const updateComplaintData = createAsyncThunk("complaint/updateComplaintData", async (complaint) => {
  const response = await updateComplaint(complaint);
  return response;
});

export const deleteComplaintData = createAsyncThunk("complaint/deleteComplaintData", async (id) => {
  const response = await deleteComplaint(id);
  return response;
});

export const searchComplaintData = createAsyncThunk("patient/searchComplaintData", async ({ search, page = 1, limit = 40 }) => {
  const response = await searchComplaint({ search, page, limit });
  return response;
});

export const speciesSlice = createSlice({
  name: "complaint",
  initialState,
  reducers: {
    // resetDepartment: (state) => {
    //   state.complaint = {};
    // },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchComplaint.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchComplaint.fulfilled, (state, action) => {
        state.status = "success";
        state.complaints = action.payload.data;
        state.totalPages = action.payload.data.totalPages;
      })
      .addCase(fetchComplaint.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(createComplaint.pending, (state) => {
        state.status = "loading";
      })
      .addCase(createComplaint.fulfilled, (state, action) => {
        state.status = "success";
        state.complaint = action.payload.data;
      })
      .addCase(createComplaint.rejected, (state, action) => {
        state.status = "failed";
      })
      .addCase(updateComplaintData.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateComplaintData.fulfilled, (state, action) => {
        state.status = "success";
        state.complaint = action.payload;
      })
      .addCase(updateComplaintData.rejected, (state, action) => {
        state.status = "failed";
      })
      .addCase(deleteComplaintData.pending, (state) => {
        state.status = "loading";
      })
      .addCase(deleteComplaintData.fulfilled, (state, action) => {
        state.status = "success";
      })
      .addCase(searchComplaintData.pending, (state) => {
        state.status = "loading";
      })
      .addCase(searchComplaintData.fulfilled, (state, action) => {
        state.status = "success";
        state.complaints = action.payload.data;
        state.totalPages = action.payload.data.totalPages;
      })
      .addCase(searchComplaintData.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default speciesSlice.reducer;
