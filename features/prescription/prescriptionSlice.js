import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { addPrescription, deletePrescription, getPrescriptions, getSinglePrescription, searchPrescription, updatePrescription } from "./prescriptionAPI";

const initialState = {
  prescriptions: [],
  prescription: {},
  status: "idle",
  error: null,
  totalPages: 1,
};

export const fetchPrescription = createAsyncThunk("prescription/fetchPrescription", async ({ page = 1, limit = 15 }) => {
  const response = await getPrescriptions({ page, limit });
  return response;
});

export const createPrescription = createAsyncThunk("prescription/createPrescription", async (prescription) => {
  const response = await addPrescription(prescription);
  return response;
});

export const updatePrescriptionData = createAsyncThunk("prescription/updatePrescriptionData", async (prescription) => {
  const response = await updatePrescription(prescription);
  return response;
});

export const deletePrescriptionData = createAsyncThunk("prescription/deletePrescriptionData", async (id) => {
  const response = await deletePrescription(id);
  return response;
});

export const fetchSinglePrescription = createAsyncThunk("prescription/fetchSinglePrescription", async (id) => {
  const response = await getSinglePrescription(id);
  return response;
});

export const searchPrescriptionData = createAsyncThunk("patient/searchPrescriptionData", async ({ search, page = 1, limit = 40 }) => {
  const response = await searchPrescription({ search, page, limit });
  return response;
});

export const prescriptionSlice = createSlice({
  name: "prescription",
  initialState,
  reducers: {
    resetPrescription: (state) => {
      state.prescription = {};
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPrescription.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchPrescription.fulfilled, (state, action) => {
        state.status = "success";
        state.prescriptions = action.payload.data;
        state.totalPages = action.payload.data.totalPages;
      })
      .addCase(fetchPrescription.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(fetchSinglePrescription.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchSinglePrescription.fulfilled, (state, action) => {
        (state.status = "success"), (state.prescription = action.payload.data);
      })
      .addCase(fetchSinglePrescription.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(createPrescription.pending, (state) => {
        state.status = "loading";
      })
      .addCase(createPrescription.fulfilled, (state, action) => {
        state.status = "success";
        state.prescription = action.payload.data;
      })
      .addCase(createPrescription.rejected, (state, action) => {
        state.status = "failed";
      })
      .addCase(updatePrescriptionData.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updatePrescriptionData.fulfilled, (state, action) => {
        state.status = "success";
        state.prescription = action.payload;
      })
      .addCase(updatePrescriptionData.rejected, (state, action) => {
        state.status = "failed";
      })
      .addCase(deletePrescriptionData.pending, (state) => {
        state.status = "loading";
      })
      .addCase(deletePrescriptionData.fulfilled, (state) => {
        state.status = "success";
      })
      .addCase(deletePrescriptionData.rejected, (state, action) => {
        state.status = "failed";
      })
      .addCase(searchPrescriptionData.pending, (state) => {
        state.status = "loading";
      })
      .addCase(searchPrescriptionData.fulfilled, (state, action) => {
        state.status = "success";
        state.prescriptions = action.payload.data;
        state.totalPages = action.payload.data.totalPages;
      })
      .addCase(searchPrescriptionData.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const { resetPrescription } = prescriptionSlice.actions;

export default prescriptionSlice.reducer;
