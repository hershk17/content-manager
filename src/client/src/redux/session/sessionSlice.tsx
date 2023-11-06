import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface LoadingState {
    email: string;
    username: string;
    userId: string;
    steamId: string;
    name: string;
    provider: string;
}

const initialState: LoadingState = {
    email: "",
    username: "",
    userId: "",
    steamId: "",
    name: "",
    provider: "",
};

export const counterSlice = createSlice({
    name: "session",
    initialState,
    reducers: {
        setEmail: (state, action) => {
            // Redux Toolkit allows us to write "mutating" logic in reducers. It
            // doesn't actually mutate the state because it uses the Immer library,
            // which detects changes to a "draft state" and produces a brand new
            // immutable state based off those changes
            state.email = action.payload;
        },
        setUsername: (state, action: PayloadAction<string>) => {
            state.username = action.payload;
        },
        setUserId: (state, action: PayloadAction<string>) => {
            state.userId = action.payload;
        },
        setSteamId: (state, action: PayloadAction<string>) => {
            state.steamId = action.payload;
        },
        setName: (state, action: PayloadAction<string>) => {
            state.name = action.payload;
        },
        setProvider: (state, action: PayloadAction<string>) => {
            state.provider = action.payload;
        },

        clearSession: (state) => {
            state.email = "";
            state.username = "";
            state.userId = "";
            state.steamId = "";
            state.name = "";
            state.provider = "";
        },
    },
});

// Action creators are generated for each case reducer function
export const { setEmail, setUsername, setUserId, setSteamId, setName, setProvider, clearSession } =
    counterSlice.actions;

export default counterSlice.reducer;
