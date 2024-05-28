import { configureStore } from "@reduxjs/toolkit";
import appointmentSlice from "../features/appointment/appointmentSlice";
import complaintSlice from "../features/complaint/complaintSlice";
import departmentSlice from "../features/department/departmentSlice";
import loggedInUserDataReducer from "../features/loggedInUser/loggedInUserSlice";
import medicineSlice from "../features/medicine/medicineSlice";
import patientRegistrationSlice from "../features/patient-registration/patientRegistrationSlice";
import pharmacySlice from "../features/pharmacy/pharmacySlice";
import prescriptionSlice from "../features/prescription/prescriptionSlice";
import speciesSlice from "../features/specie/speciesSlice";
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
    specie: speciesSlice,
    complaint: complaintSlice,
    pharmacy: pharmacySlice,
    loggedInUser: loggedInUserDataReducer
  },
});

export default store;
