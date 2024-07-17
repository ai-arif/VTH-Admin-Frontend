import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { addFeedback, deleteFeedback, getFeedbacks, updateFeedback } from "./feedbackAPI";

const initialState = {
  feedback: {},
  feedbacks: [],
  status: "idle",
  error: null,
  totalPages: 1,
};

export const fetchFeedback = createAsyncThunk("feedback/fetchFeedback", async ({ page = 1, limit = 15 }) => {
  const response = await getFeedbacks({ page, limit });
  return response;
});

export const createFeedback = createAsyncThunk("feedback/createFeedback", async (feedback) => {
  const response = await addFeedback(feedback);
  return response;
});

export const updateFeedbackData = createAsyncThunk("feedback/updateFeedbackData", async (feedback) => {
  const response = await updateFeedback(feedback);
  return response;
});

export const deleteFeedbackData = createAsyncThunk("feedback/deleteFeedbackData", async (id) => {
  const response = await deleteFeedback(id);
  return response;
});

export const speciesSlice = createSlice({
  name: "feedback",
  initialState,
  reducers: {
    // resetDepartment: (state) => {
    //   state.feedback = {};
    // },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchFeedback.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchFeedback.fulfilled, (state, action) => {
        state.status = "success";
        state.feedbacks = action.payload.data;
        state.totalPages = action.payload.data.totalPages;
      })
      .addCase(fetchFeedback.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(createFeedback.pending, (state) => {
        state.status = "loading";
      })
      .addCase(createFeedback.fulfilled, (state, action) => {
        state.status = "success";
        state.feedback = action.payload.data;
      })
      .addCase(createFeedback.rejected, (state, action) => {
        state.status = "failed";
      })
      .addCase(updateFeedbackData.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateFeedbackData.fulfilled, (state, action) => {
        state.status = "success";
        state.feedback = action.payload;
      })
      .addCase(updateFeedbackData.rejected, (state, action) => {
        state.status = "failed";
      })
      .addCase(deleteFeedbackData.pending, (state) => {
        state.status = "loading";
      })
      .addCase(deleteFeedbackData.fulfilled, (state, action) => {
        state.status = "success";
      });
  },
});

export default speciesSlice.reducer;
