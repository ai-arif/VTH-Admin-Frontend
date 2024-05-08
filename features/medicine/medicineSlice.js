import { getMedicine,addMedicine,deleteMedicine,updateMedicine,getSingleMedicine } from "./medicineAPI";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

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
            });
    },
});

export default medicineSlice.reducer;

