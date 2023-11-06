import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import Game from "../../models/Game";

export interface LibraryState {
    value: Game[];
}

const initialState: LibraryState = {
    value: [],
};

export const counterSlice = createSlice({
    name: "library",
    initialState,
    reducers: {
        addGame: (state, action: PayloadAction<Game>) => {
            state.value.push(action.payload);
        },
        removeGame: (state, action: PayloadAction<Game>) => {
            state.value.filter((value) => {
                return value.appid !== action.payload.appid;
            });
        },
    },
});

// Action creators are generated for each case reducer function
export const { addGame, removeGame } = counterSlice.actions;

export default counterSlice.reducer;
