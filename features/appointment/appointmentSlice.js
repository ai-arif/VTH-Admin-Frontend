import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  addAppointment,
  deleteAppointment,
  getAppointmentById,
  getAppointmentsByPhone,
  getApprovedAppointments,
  getPendingAppointments,
  searchApprovedAppointments,
  searchPendingAppointments,
  updateAppointment,
} from "./appointmentAPI";

const initialState = {
  appointments: [],
  pendingAppointments: [],
  appointment: null,
  status: "idle",
  error: null,
  currentPage: 1,
  totalPages: 1,
};

export const fetchApprovedAppointments = createAsyncThunk("appointment/fetchApprovedAppointments", async ({ page, limit }) => {
  return await getApprovedAppointments(page, limit);
});

export const fetchPendingAppointments = createAsyncThunk("appointment/fetchPendingAppointments", async ({ page, limit }) => {
  return await getPendingAppointments(page, limit);
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

export const searchApprovedAppointmentsData = createAsyncThunk("appointment/searchApprovedAppointmentsData", async ({ search, page, limit, status }) => {
  const response = await searchApprovedAppointments(search, page, limit, status);
  return response;
});

export const searchPendingAppointmentsData = createAsyncThunk("appointment/searchPendingAppointmentsData", async ({ search, page, limit, status }) => {
  const response = await searchPendingAppointments(search, page, limit, status);
  return response;
});

const appointmentSlice = createSlice({
  name: "appointment",
  initialState,
  reducers: {
    clearAppointment(state) {
      state.appointment = null;
    },
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload;
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
        state.totalPages = action.payload.data.totalPages;
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
        state.totalPages = action.payload.data.totalPages;
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
      .addCase(searchApprovedAppointmentsData.pending, (state) => {
        state.status = "loading";
      })
      .addCase(searchApprovedAppointmentsData.fulfilled, (state, action) => {
        state.status = "success";
        state.appointments = action.payload.data;
        state.totalPages = action.payload.data.totalPages;
      })
      .addCase(searchApprovedAppointmentsData.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(searchPendingAppointmentsData.pending, (state) => {
        state.status = "loading";
      })
      .addCase(searchPendingAppointmentsData.fulfilled, (state, action) => {
        state.status = "success";
        state.pendingAppointments = action.payload.data;
        state.totalPages = action.payload.data.totalPages;
      })
      .addCase(searchPendingAppointmentsData.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const { clearAppointment, setCurrentPage } = appointmentSlice.actions;

export default appointmentSlice.reducer;
