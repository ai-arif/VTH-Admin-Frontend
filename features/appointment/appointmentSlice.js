import {getAppointmentById, getAppointments, addAppointment, updateAppointment, deleteAppointment,getAppointmentsByPhone} from "./appointmentAPI";
import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";

const initialState = {
    appointments: [],
    appointment: null,
    status: "idle",
    error: null
};

export const fetchAppointments = createAsyncThunk("appointment/fetchAppointments", async () => {
    return await getAppointments();
});

export const fetchAppointmentById = createAsyncThunk("appointment/fetchAppointmentById", async (id) => {
    return await getAppointmentById(id);
});

export const addNewAppointment = createAsyncThunk("appointment/addNewAppointment", async (appointment) => {
    return await addAppointment(appointment);
});

export const updateExistingAppointment = createAsyncThunk("appointment/updateExistingAppointment", async (appointment) => {
    return await updateAppointment(appointment);
});

export const deleteExistingAppointment = createAsyncThunk("appointment/deleteExistingAppointment", async (id) => {
    return await deleteAppointment(id);
});

export const fetchAppointmentsByPhone = createAsyncThunk("appointment/fetchAppointmentsByPhone", async (phone) => {
    return await getAppointmentsByPhone(phone);
});


const appointmentSlice = createSlice({
    name: "appointment",
    initialState,
    reducers: {
        clearAppointment(state) {
            state.appointment = null;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchAppointments.pending, (state) => {
            state.status = "loading";
        })
        .addCase(fetchAppointments.fulfilled, (state, action) => {
            state.status = "success";
            state.appointments = action.payload.data;
        })
        .addCase(fetchAppointments.rejected, (state, action) => {
            state.status = "failed";
            state.error = action.error.message;
        })
        .addCase(fetchAppointmentById.pending, (state) => {
            state.status = "loading";
        })
        .addCase(fetchAppointmentById.fulfilled, (state, action) => {
            state.status = "success";
            state.appointment = action.payload.data;
        })
        .addCase(fetchAppointmentById.rejected, (state, action) => {
            state.status = "failed";
            state.error = action.error.message;
        })
        .addCase(addNewAppointment.pending, (state) => {
            state.status = "loading";
        })
        .addCase(addNewAppointment.fulfilled, (state, action) => {
            state.status = "success";
        })
        .addCase(addNewAppointment.rejected, (state, action) => {
            state.status = "failed";
            state.error = action.error.message;
        })
        .addCase(updateExistingAppointment.pending, (state) => {
            state.status = "loading";
        })
        .addCase(updateExistingAppointment.fulfilled, (state, action) => {
            state.status = "success";
        })
        .addCase(updateExistingAppointment.rejected, (state, action) => {
            state.status = "failed";
            state.error = action.error.message;
        })
        .addCase(deleteExistingAppointment.pending, (state) => {
            state.status = "loading";
        })
        .addCase(deleteExistingAppointment.fulfilled, (state, action) => {
            state.status = "success";
        })
        .addCase(deleteExistingAppointment.rejected, (state, action) => {
            state.status = "failed";
            state.error = action.error.message;
        })
        .addCase(fetchAppointmentsByPhone.pending, (state) => {
            state.status = "loading";
        })
        .addCase(fetchAppointmentsByPhone.fulfilled, (state, action) => {
            state.status = "success";
            state.appointments = action.payload.data;
        })
        .addCase(fetchAppointmentsByPhone.rejected, (state, action) => {
            state.status = "failed";
            state.error = action.error.message;
        });

    }
});

export const {clearAppointment} = appointmentSlice.actions;

export default appointmentSlice.reducer;