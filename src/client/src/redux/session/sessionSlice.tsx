import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import User from "../../models/User";

const initialState: User = {
    username: "", // UNIQUE IDENTIFIER
    email: "",
    password: "",
    name: "",
    avatar: "",
    provider: "",
    googleId: "",
    steamId: "",
    facebookId: "",
    twitterId: "",
};

export const sessionSlice = createSlice({
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
        setSteamId: (state, action: PayloadAction<string>) => {
            state.steamId = action.payload;
        },
        setFacebookId: (state, action: PayloadAction<string>) => {
            state.facebookId = action.payload;
        },
        setTwitterId: (state, action: PayloadAction<string>) => {
            state.twitterId = action.payload;
        },
        setName: (state, action: PayloadAction<string>) => {
            state.name = action.payload;
        },
        setProvider: (state, action: PayloadAction<string>) => {
            state.provider = action.payload;
        },

        clearSession: (state) => initialState,
    },
});

// Action creators are generated for each case reducer function
export const {
    setEmail,
    setUsername,
    setSteamId,
    setFacebookId,
    setTwitterId,
    setName,
    setProvider,
    clearSession,
} = sessionSlice.actions;

export default sessionSlice.reducer;
