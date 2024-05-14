import { configureStore } from "@reduxjs/toolkit";
import departmentSlice from "../features/department/departmentSlice";
import medicineSlice from "../features/medicine/medicineSlice";
import appointmentSlice from "../features/appointment/appointmentSlice";
import testSlice from "../features/test/testSlice";
import prescriptionSlice from "../features/prescription/prescriptionSlice";
import patientRegistrationSlice from "../features/patient-registration/patientRegistrationSlice";
import userPatientSlice from "../features/userPatient/userPatientSlice";
import staffSlice from "../features/staff/staffSlice";

const store = configureStore({
  reducer: {
    staff: staffSlice,
    test: testSlice,
    medicine: medicineSlice,
    appointment: appointmentSlice,
    department: departmentSlice,
    prescription: prescriptionSlice,
    patient:patientRegistrationSlice,
    userPatient: userPatientSlice,
  },
});

export default store;
