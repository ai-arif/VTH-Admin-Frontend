import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { addSpecies, deleteSpecies, getSpecies, searchSpecies, updateSpecies } from "./speciesAPI";

const initialState = {
  specie: {},
  species: [],
  status: "idle",
  error: null,
  totalPages: 1,
};

export const fetchSpecies = createAsyncThunk("specie/fetchSpecies", async ({ page = 1, limit = 15 }) => {
  const response = await getSpecies({ page, limit });
  return response;
});

export const createSpecies = createAsyncThunk("specie/createSpecies", async (specie) => {
  const response = await addSpecies(specie);
  return response;
});

export const updateSpeciesData = createAsyncThunk("specie/updateSpeciesData", async (specie) => {
  const response = await updateSpecies(specie);
  return response;
});

export const deleteSpeciesData = createAsyncThunk("specie/deleteSpeciesData", async (id) => {
  const response = await deleteSpecies(id);
  return response;
});

export const searchSpeciesData = createAsyncThunk("specie/searchSpeciesData", async ({ search, page = 1, limit = 40 }) => {
  const response = await searchSpecies({ search, page, limit });
  return response;
});

export const speciesSlice = createSlice({
  name: "specie",
  initialState,
  reducers: {
    // resetDepartment: (state) => {
    //   state.specie = {};
    // },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchSpecies.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchSpecies.fulfilled, (state, action) => {
        state.status = "success";
        state.species = action.payload.data;
        state.totalPages = action.payload.data.totalPages;
      })
      .addCase(fetchSpecies.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(createSpecies.pending, (state) => {
        state.status = "loading";
      })
      .addCase(createSpecies.fulfilled, (state, action) => {
        state.status = "success";
        state.specie = action.payload.data;
      })
      .addCase(createSpecies.rejected, (state, action) => {
        state.status = "failed";
      })
      .addCase(updateSpeciesData.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateSpeciesData.fulfilled, (state, action) => {
        state.status = "success";
        state.specie = action.payload;
      })
      .addCase(updateSpeciesData.rejected, (state, action) => {
        state.status = "failed";
      })
      .addCase(deleteSpeciesData.pending, (state) => {
        state.status = "loading";
      })
      .addCase(deleteSpeciesData.fulfilled, (state, action) => {
        state.status = "success";
      })
      .addCase(searchSpeciesData.pending, (state) => {
        state.status = "loading";
      })
      .addCase(searchSpeciesData.fulfilled, (state, action) => {
        state.status = "success";
        state.species = action.payload.data;
        state.totalPages = action.payload.data.totalPages;
      })
      .addCase(searchSpeciesData.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default speciesSlice.reducer;
