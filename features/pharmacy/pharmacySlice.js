import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { addPharmacy, deletePharmacy, getPharmacyPrescription, getSinglePharmacy, searchPharmacy, updatePharmacy } from "./pharmacyAPI";

const initialState = {
  pharmacy: {},
  pharmacies: [],
  status: "idle",
  error: null,
  totalPages: 1,
};

export const fetchPharmacy = createAsyncThunk("pharmacy/fetchPharmacy", async ({ page = 1, limit = 15 }) => {
  const response = await getPharmacyPrescription({ page, limit });
  return response;
});

export const fetchSinglePharmacy = createAsyncThunk("pharmacy/fetchSinglePharmacy", async (id) => {
  const response = await getSinglePharmacy(id);
  return response;
});

export const createPharmacy = createAsyncThunk("pharmacy/createPharmacy", async (pharmacy) => {
  const response = await addPharmacy(pharmacy);
  return response;
});

export const updatePharmacyData = createAsyncThunk("pharmacy/updatePharmacyData", async (pharmacy) => {
  const response = await updatePharmacy(pharmacy);
  return response;
});

export const deletePharmacyData = createAsyncThunk("pharmacy/deletePharmacyData", async (id) => {
  const response = await deletePharmacy(id);
  return response;
});

export const searchPharmacyData = createAsyncThunk("patient/searchPharmacyData", async ({ search, page = 1, limit = 40 }) => {
  const response = await searchPharmacy({ search, page, limit });
  return response;
});

export const pharmacySlice = createSlice({
  name: "pharmacy",
  initialState,
  reducers: {
    // resetPharmacy: (state) => {
    //   state.pharmacy = {};
    // },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPharmacy.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchPharmacy.fulfilled, (state, action) => {
        state.status = "success";
        state.pharmacies = action.payload.data;
        state.totalPages = action.payload.data.totalPages;
      })
      .addCase(fetchPharmacy.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(fetchSinglePharmacy.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchSinglePharmacy.fulfilled, (state, action) => {
        (state.status = "success"), (state.pharmacy = action.payload.data);
      })
      .addCase(fetchSinglePharmacy.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(createPharmacy.pending, (state) => {
        state.status = "loading";
      })
      .addCase(createPharmacy.fulfilled, (state, action) => {
        state.status = "success";
        state.pharmacy = action.payload.data;
      })
      .addCase(createPharmacy.rejected, (state, action) => {
        state.status = "failed";
      })
      .addCase(updatePharmacyData.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updatePharmacyData.fulfilled, (state, action) => {
        state.status = "success";
        state.pharmacy = action.payload;
      })
      .addCase(updatePharmacyData.rejected, (state, action) => {
        state.status = "failed";
      })
      .addCase(deletePharmacyData.pending, (state) => {
        state.status = "loading";
      })
      .addCase(deletePharmacyData.fulfilled, (state) => {
        state.status = "success";
      })
      .addCase(deletePharmacyData.rejected, (state, action) => {
        state.status = "failed";
      })
      .addCase(searchPharmacyData.pending, (state) => {
        state.status = "loading";
      })
      .addCase(searchPharmacyData.fulfilled, (state, action) => {
        state.status = "success";
        state.pharmacies = action.payload.data;
        state.totalPages = action.payload.data.totalPages;
      })
      .addCase(searchPharmacyData.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const { resetPharmacy } = pharmacySlice.actions;

export default pharmacySlice.reducer;
