import { configureStore } from "@reduxjs/toolkit";
import departmentSlice from "../features/department/departmentSlice";
import medicineSlice from "../features/medicine/medicineSlice";
import appointmentSlice from "../features/appointment/appointmentSlice";
import testSlice from "../features/test/testSlice";
import userSlice from "../features/user/userSlice";

const store = configureStore({
  reducer: {
    user: userSlice,
    test: testSlice,
    medicine: medicineSlice,
    appointment: appointmentSlice,
    department: departmentSlice,
  },
});

export default store;
