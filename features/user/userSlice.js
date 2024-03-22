import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getUser,updateUser } from "./userAPI";

const initialState = {
    user: {},
    status: "idle",
    error: null,
};

export const fetchUser = createAsyncThunk("user/fetchUser", async () => {
    const response = await getUser();
    return response;
});

export const updateUserAsync = createAsyncThunk("user/updateUser", async (data) => {
    const response = await updateUser(data);
    return response;
});

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        resetUser: (state) => {
            state.user = {};
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchUser.pending, (state) => {
                state.status = "loading";
            })
            .addCase(fetchUser.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.user = action.payload;
            })
            .addCase(fetchUser.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.error.message;
            })
            .addCase(updateUserAsync.pending, (state) => {
                state.status = "loading";
            })
            .addCase(updateUserAsync.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.user = action.payload;
            })
            .addCase(updateUserAsync.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.error.message;
            });
    },
});

export const { resetUser } = userSlice.actions;

export  default userSlice.reducer;
