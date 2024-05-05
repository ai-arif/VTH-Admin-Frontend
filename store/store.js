import { configureStore } from "@reduxjs/toolkit";
import userSlice from "../features/user/userSlice";
import testSlice from "../features/test/testSlice";
const store = configureStore({
  reducer: {
    user: userSlice,
    test: testSlice,
  },
});


export default store;
