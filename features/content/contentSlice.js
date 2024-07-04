import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { addContent, deleteContent, getContents, updateContent } from "./contentAPI";

const initialState = {
  content: {},
  contents: [],
  status: "idle",
  error: null,
  totalPages: 1,
};

export const fetchContents = createAsyncThunk("content/fetchContents", async ({ page = 1, limit = 15 }) => {
  const response = await getContents({ page, limit });
  return response;
});

export const createContent = createAsyncThunk("content/createContent", async (content) => {
  const response = await addContent(content);
  return response;
});

export const updateContentData = createAsyncThunk("content/updateContentData", async (content) => {
  const response = await updateContent(content);
  return response;
});

export const deleteContentData = createAsyncThunk("content/deleteContentData", async (id) => {
  const response = await deleteContent(id);
  return response;
});

export const speciesSlice = createSlice({
  name: "content",
  initialState,
  reducers: {
    // resetDepartment: (state) => {
    //   state.content = {};
    // },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchContents.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchContents.fulfilled, (state, action) => {
        state.status = "success";
        state.contents = action.payload.data;
        state.totalPages = action.payload.data.totalPages;
      })
      .addCase(fetchContents.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(createContent.pending, (state) => {
        state.status = "loading";
      })
      .addCase(createContent.fulfilled, (state, action) => {
        state.status = "success";
        state.content = action.payload.data;
      })
      .addCase(createContent.rejected, (state, action) => {
        state.status = "failed";
      })
      .addCase(updateContentData.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateContentData.fulfilled, (state, action) => {
        state.status = "success";
        state.content = action.payload;
      })
      .addCase(updateContentData.rejected, (state, action) => {
        state.status = "failed";
      })
      .addCase(deleteContentData.pending, (state) => {
        state.status = "loading";
      })
      .addCase(deleteContentData.fulfilled, (state, action) => {
        state.status = "success";
      });
  },
});

export default speciesSlice.reducer;
