import { configureStore } from "@reduxjs/toolkit";
import userSlice from "../features/user/userSlice";
import testSlice from "../features/test/testSlice";
import medicineSlice from "../features/medicine/medicineSlice";

const store = configureStore({
  reducer: {
    user: userSlice,
    test: testSlice,
    medicine: medicineSlice,
  },
});


export default store;
