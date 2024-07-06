import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { addMedicineParam, deleteMedicineParam, getMedicineParams, updatedMedicineParam } from "./MedicineParamsAPI";

const initialState = {
  medicineParam: {},
  medicineParams: [],
  status: "idle",
  error: null,
};

export const fetchMedicineParams = createAsyncThunk("medicineParam/fetchMedicineParams", async () => {
  const response = await getMedicineParams();
  return response;
});

export const createMedicineParams = createAsyncThunk("medicineParam/createMedicineParams", async (medicineParam) => {
  const response = await addMedicineParam(medicineParam);
  return response;
});

export const updateMedicineParamsData = createAsyncThunk("medicineParam/updateMedicineParamsData", async (medicineParam) => {
  const response = await updatedMedicineParam(medicineParam);
  return response;
});

export const deleteMedicineParamsData = createAsyncThunk("medicineParam/deleteMedicineParamsData", async (id) => {
  const response = await deleteMedicineParam(id);
  return response;
});

export const speciesSlice = createSlice({
  name: "medicineParam",
  initialState,
  reducers: {
    // resetDepartment: (state) => {
    //   state.medicineParam = {};
    // },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMedicineParams.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchMedicineParams.fulfilled, (state, action) => {
        state.status = "success";
        state.medicineParams = action.payload.data;
      })
      .addCase(fetchMedicineParams.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(createMedicineParams.pending, (state) => {
        state.status = "loading";
      })
      .addCase(createMedicineParams.fulfilled, (state, action) => {
        state.status = "success";
        state.medicineParam = action.payload.data;
      })
      .addCase(createMedicineParams.rejected, (state, action) => {
        state.status = "failed";
      })
      .addCase(updateMedicineParamsData.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateMedicineParamsData.fulfilled, (state, action) => {
        state.status = "success";
        state.medicineParam = action.payload;
      })
      .addCase(updateMedicineParamsData.rejected, (state, action) => {
        state.status = "failed";
      })
      .addCase(deleteMedicineParamsData.pending, (state) => {
        state.status = "loading";
      })
      .addCase(deleteMedicineParamsData.fulfilled, (state, action) => {
        state.status = "success";
      });
  },
});

export default speciesSlice.reducer;
