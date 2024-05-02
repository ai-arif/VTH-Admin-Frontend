import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getUser,updateUser,getAllUsers,createUser } from "./userAPI";

const initialState = {
    user: {},
    users: [],
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

export const fetchAllUsers = createAsyncThunk("user/fetchAllUsers", async () => {
    const response = await getAllUsers();
    return response;
});

export const createUserAsync = createAsyncThunk("user/createUser", async (data) => {
    const response = await createUser(data);
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
                state.user = action.payload.data;
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
            })
            .addCase(fetchAllUsers.pending, (state) => {
                state.status = "loading";
            })
            .addCase(fetchAllUsers.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.users = action.payload.data;
            })
            .addCase(fetchAllUsers.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.error.message;
            })
            .addCase(createUserAsync.pending, (state) => {
                state.status = "loading";
            })
            .addCase(createUserAsync.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.users = [...state.users, action.payload.data];
            })
            .addCase(createUserAsync.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.error.message;
            });
    },
});



export const { resetUser } = userSlice.actions;

export  default userSlice.reducer;
