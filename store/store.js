import { configureStore } from "@reduxjs/toolkit";
import appointmentSlice from "../features/appointment/appointmentSlice";
import departmentSlice from "../features/department/departmentSlice";
import medicineSlice from "../features/medicine/medicineSlice";
import patientRegistrationSlice from "../features/patient-registration/patientRegistrationSlice";
import prescriptionSlice from "../features/prescription/prescriptionSlice";
import staffSlice from "../features/staff/staffSlice";
import testSlice from "../features/test/testSlice";
import userPatientSlice from "../features/userPatient/userPatientSlice";

const store = configureStore({
  reducer: {
    staff: staffSlice,
    test: testSlice,
    medicine: medicineSlice,
    appointment: appointmentSlice,
    department: departmentSlice,
    prescription: prescriptionSlice,
    patient: patientRegistrationSlice,
    userPatient: userPatientSlice,
  },
});

export default store;
