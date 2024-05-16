import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { addMedicine, deleteMedicine, getMedicine, getSingleMedicine, searchMedicine, updateMedicine } from "./medicineAPI";

const initialState = {
  medicine: {},
  medicines: [],
  status: "idle",
  error: null,
};

export const fetchMedicine = createAsyncThunk("medicine/fetchMedicine", async () => {
  const response = await getMedicine();
  return response;
});

export const createMedicine = createAsyncThunk("medicine/createMedicine", async (medicine) => {
  const response = await addMedicine(medicine);
  return response;
});

export const updateMedicineData = createAsyncThunk("medicine/updateMedicineData", async (medicine) => {
  const response = await updateMedicine(medicine);
  return response;
});

export const deleteMedicineData = createAsyncThunk("medicine/deleteMedicineData", async (id) => {
  const response = await deleteMedicine(id);
  return response;
});

export const fetchSingleMedicine = createAsyncThunk("medicine/fetchSingleMedicine", async (id) => {
  const response = await getSingleMedicine(id);
  return response;
});

export const searchMedicineData = createAsyncThunk("medicine/searchMedicineData", async (search) => {
  const response = await searchMedicine(search);
  return response;
});

export const medicineSlice = createSlice({
  name: "medicine",
  initialState,
  reducers: {
    // resetMedicine: (state) => {
    //   state.medicine = {};
    // },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMedicine.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchMedicine.fulfilled, (state, action) => {
        (state.status = "success"), (state.medicines = action.payload.data);
      })
      .addCase(fetchMedicine.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(fetchSingleMedicine.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchSingleMedicine.fulfilled, (state, action) => {
        (state.status = "success"), (state.medicine = action.payload.data);
      })
      .addCase(fetchSingleMedicine.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(createMedicine.pending, (state) => {
        state.status = "loading";
      })
      .addCase(createMedicine.fulfilled, (state, action) => {
        state.status = "success";
        state.medicine = action.payload.data;
      })
      .addCase(createMedicine.rejected, (state, action) => {
        state.status = "failed";
      })
      .addCase(updateMedicineData.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateMedicineData.fulfilled, (state, action) => {
        state.status = "success";
        state.medicine = action.payload;
      })
      .addCase(updateMedicineData.rejected, (state, action) => {
        state.status = "failed";
      })
      .addCase(deleteMedicineData.pending, (state) => {
        state.status = "loading";
      })
      .addCase(deleteMedicineData.fulfilled, (state, action) => {
        state.status = "success";
      })
      .addCase(deleteMedicineData.rejected, (state, action) => {
        state.status = "failed";
      })
      .addCase(searchMedicineData.pending, (state) => {
        state.status = "loading";
      })
      .addCase(searchMedicineData.fulfilled, (state, action) => {
        (state.status = "success"), (state.patients = action.payload.data);
      })
      .addCase(searchMedicineData.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default medicineSlice.reducer;
