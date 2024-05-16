import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {registerPatient, getPatient,searchPatient, getSinglePatient, updatePatient, deletePatient} from "./patientRegistrationAPI";

const initialState = {
    patient: {},
    patients: [],
    status: "idle",
    error: null,
    };

export const fetchPatient = createAsyncThunk("patient/fetchPatient", async () => {
    const response = await getPatient();
    return response;
});

export const createPatient = createAsyncThunk("patient/createPatient", async (patient) => {
    const response = await registerPatient(patient);
    return response;
});

export const updatePatientData = createAsyncThunk("patient/updatePatientData", async (patient) => {
    const response = await updatePatient(patient);
    return response;
});

export const deletePatientData = createAsyncThunk("patient/deletePatientData", async (id) => {
    const response = await deletePatient(id);
    return response;
});

export const fetchSinglePatient = createAsyncThunk("patient/fetchSinglePatient", async (id) => {
    const response = await getSinglePatient(id);
    return response;
});

export const searchPatientData = createAsyncThunk("patient/searchPatientData", async (search) => {
    const response = await searchPatient(search);
    return response;
});

export const patientRegistrationSlice = createSlice({
    name: "patient",
    initialState,
    reducers: {
        // resetPatient: (state) => {
        //   state.patient = {};
        // },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchPatient.pending, (state) => {
                state.status = "loading";
            })
            .addCase(fetchPatient.fulfilled, (state, action) => {
                (state.status = "success"), (state.patients = action.payload.data);
            })
            .addCase(fetchPatient.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.error.message;
            })
            .addCase(fetchSinglePatient.pending, (state) => {
                state.status = "loading";
            })
            .addCase(fetchSinglePatient.fulfilled, (state, action) => {
                (state.status = "success"), (state.patient = action.payload.data);
            })
            .addCase(createPatient.pending, (state) => {
                state.status = "loading";
            })
            .addCase(createPatient.fulfilled, (state, action) => {
                (state.status = "success"), (state.patient = action.payload.data);
            })
            .addCase(createPatient.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.error.message;
            })
            .addCase(updatePatientData.pending, (state) => {
                state.status = "loading";
            })
            .addCase(updatePatientData.fulfilled, (state, action) => {
                (state.status = "success"), (state.patient = action.payload.data);
            })
            .addCase(updatePatientData.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.error.message;
            })
            .addCase(deletePatientData.pending, (state) => {
                state.status = "loading";
            })
            .addCase(deletePatientData.fulfilled, (state, action) => {
                (state.status = "success"), (state.patient = action.payload.data);
            })
            .addCase(deletePatientData.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.error.message;
            })
            .addCase(searchPatientData.pending, (state) => {
                state.status = "loading";
            })
            .addCase(searchPatientData.fulfilled, (state, action) => {
                (state.status = "success"), (state.patients = action.payload.data);
            })
            .addCase(searchPatientData.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.error.message;
            });
            
    },
});

export const { resetPatient } = patientRegistrationSlice.actions;

export default patientRegistrationSlice.reducer;