import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  addAppointment,
  deleteAppointment,
  getAppointmentById,
  getAppointmentsByPhone,
  getApprovedAppointments,
  getPendingAppointments,
  searchApprovedAppointment,
  searchPendingAppointment,
  updateAppointment,
} from "./appointmentAPI";

const initialState = {
  appointments: [],
  pendingAppointments: [],
  appointment: null,
  status: "idle",
  error: null,
};

export const fetchApprovedAppointments = createAsyncThunk("appointment/fetchApprovedAppointments", async () => {
  return await getApprovedAppointments();
});

export const fetchPendingAppointments = createAsyncThunk("appointment/fetchPendingAppointments", async () => {
  return await getPendingAppointments();
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

export const searchApprovedAppointmentData = createAsyncThunk("appointment/searchApprovedAppointmentData", async (search) => {
  const response = await searchApprovedAppointment(search);
  return response;
});

export const searchPendingAppointmentData = createAsyncThunk("appointment/searchPendingAppointmentData", async (search) => {
  const response = await searchPendingAppointment(search);
  return response;
});

const appointmentSlice = createSlice({
  name: "appointment",
  initialState,
  reducers: {
    clearAppointment(state) {
      state.appointment = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchApprovedAppointments.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchApprovedAppointments.fulfilled, (state, action) => {
        state.status = "success";
        state.appointments = action.payload.data;
      })
      .addCase(fetchApprovedAppointments.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(fetchPendingAppointments.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchPendingAppointments.fulfilled, (state, action) => {
        state.status = "success";
        state.pendingAppointments = action.payload.data;
      })
      .addCase(fetchPendingAppointments.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
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
      })
      .addCase(searchApprovedAppointmentData.pending, (state) => {
        state.status = "loading";
      })
      .addCase(searchApprovedAppointmentData.fulfilled, (state, action) => {
        (state.status = "success"), (state.patients = action.payload.data);
      })
      .addCase(searchApprovedAppointmentData.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(searchPendingAppointmentData.pending, (state) => {
        state.status = "loading";
      })
      .addCase(searchPendingAppointmentData.fulfilled, (state, action) => {
        (state.status = "success"), (state.patients = action.payload.data);
      })
      .addCase(searchPendingAppointmentData.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const { clearAppointment } = appointmentSlice.actions;

export default appointmentSlice.reducer;
