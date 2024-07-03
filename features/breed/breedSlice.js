import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { addBreed, deleteBreed, getBreed, getBreedsBySpecies, updateBreed } from "./breedAPI";

const initialState = {
  breed: {},
  breeds: [],
  breedsBySpecies: [],
  status: "idle",
  error: null,
  totalPages: 1,
};

export const fetchBreed = createAsyncThunk("breed/fetchBreed", async ({ page = 1, limit = 15 }) => {
  const response = await getBreed({ page, limit });
  return response;
});

export const createBreed = createAsyncThunk("breed/createBreed", async (breed) => {
  const response = await addBreed(breed);
  return response;
});

export const updateBreedData = createAsyncThunk("breed/updateBreedData", async (breed) => {
  const response = await updateBreed(breed);
  return response;
});

export const deleteBreedData = createAsyncThunk("breed/deleteBreedData", async (id) => {
  const response = await deleteBreed(id);
  return response;
});

export const searchBreedData = createAsyncThunk("breed/searchBreedData", async ({ search, page = 1, limit = 40 }) => {
  const response = await searchBreed({ search, page, limit });
  return response;
});

export const fetchBreedBySpecies = createAsyncThunk("breed/fetchBreedBySpecies", async (speciesId) => {
  const response = await getBreedsBySpecies(speciesId);
  return response;
});

export const speciesSlice = createSlice({
  name: "breed",
  initialState,
  reducers: {
    // resetDepartment: (state) => {
    //   state.breed = {};
    // },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchBreed.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchBreed.fulfilled, (state, action) => {
        state.status = "success";
        state.breeds = action.payload.data;
        state.totalPages = action.payload.data.totalPages;
      })
      .addCase(fetchBreed.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(fetchBreedBySpecies.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchBreedBySpecies.fulfilled, (state, action) => {
        state.status = "success";
        state.breedsBySpecies = action.payload.data;
      })
      .addCase(fetchBreedBySpecies.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(createBreed.pending, (state) => {
        state.status = "loading";
      })
      .addCase(createBreed.fulfilled, (state, action) => {
        state.status = "success";
        state.breed = action.payload.data;
      })
      .addCase(createBreed.rejected, (state, action) => {
        state.status = "failed";
      })
      .addCase(updateBreedData.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateBreedData.fulfilled, (state, action) => {
        state.status = "success";
        state.breed = action.payload;
      })
      .addCase(updateBreedData.rejected, (state, action) => {
        state.status = "failed";
      })
      .addCase(deleteBreedData.pending, (state) => {
        state.status = "loading";
      })
      .addCase(deleteBreedData.fulfilled, (state, action) => {
        state.status = "success";
      })
      .addCase(searchBreedData.pending, (state) => {
        state.status = "loading";
      })
      .addCase(searchBreedData.fulfilled, (state, action) => {
        state.status = "success";
        state.breeds = action.payload.data;
        state.totalPages = action.payload.data.totalPages;
      })
      .addCase(searchBreedData.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default speciesSlice.reducer;
