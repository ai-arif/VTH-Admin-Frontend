import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { addLogo, deleteLogo, getLogos, updateLogo } from "./logoAPI";

const initialState = {
  logo: {},
  logos: [],
  status: "idle",
  error: null,
};

export const fetchLogos = createAsyncThunk("logo/fetchLogos", async () => {
  const response = await getLogos();
  return response;
});

export const createLogo = createAsyncThunk("logo/createLogo", async (logo) => {
  const response = await addLogo(logo);
  return response;
});

export const updateLogoData = createAsyncThunk("logo/updateLogoData", async (logo) => {
  const response = await updateLogo(logo);
  return response;
});

export const deleteLogoData = createAsyncThunk("logo/deleteLogoData", async (id) => {
  const response = await deleteLogo(id);
  return response;
});

export const speciesSlice = createSlice({
  name: "logo",
  initialState,
  reducers: {
    // resetDepartment: (state) => {
    //   state.logo = {};
    // },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchLogos.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchLogos.fulfilled, (state, action) => {
        state.status = "success";
        state.logos = action.payload.data;
      })
      .addCase(fetchLogos.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(createLogo.pending, (state) => {
        state.status = "loading";
      })
      .addCase(createLogo.fulfilled, (state, action) => {
        state.status = "success";
        state.logo = action.payload.data;
      })
      .addCase(createLogo.rejected, (state, action) => {
        state.status = "failed";
      })
      .addCase(updateLogoData.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateLogoData.fulfilled, (state, action) => {
        state.status = "success";
        state.logo = action.payload;
      })
      .addCase(updateLogoData.rejected, (state, action) => {
        state.status = "failed";
      })
      .addCase(deleteLogoData.pending, (state) => {
        state.status = "loading";
      })
      .addCase(deleteLogoData.fulfilled, (state, action) => {
        state.status = "success";
      });
  },
});

export default speciesSlice.reducer;
