import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface LoadingState {
    value: boolean;
}

const initialState: LoadingState = {
    value: true,
};

export const counterSlice = createSlice({
    name: "isLoading",
    initialState,
    reducers: {
        setTrue: (state) => {
            // Redux Toolkit allows us to write "mutating" logic in reducers. It
            // doesn't actually mutate the state because it uses the Immer library,
            // which detects changes to a "draft state" and produces a brand new
            // immutable state based off those changes
            state.value = true;
        },
        setFalse: (state) => {
            state.value = false;
        },
    },
});

// Action creators are generated for each case reducer function
export const { setFalse, setTrue } = counterSlice.actions;

export default counterSlice.reducer;
