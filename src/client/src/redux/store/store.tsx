import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "../counter/counterSlice";
import isLoadingReducer from "../isLoading/isLoadingSlice";
import libraryReducer from "../library/librarySlice";
import sessionReducer from "../session/sessionSlice";

export const store = configureStore({
    reducer: {
        counter: counterReducer,
        isLoading: isLoadingReducer,
        library: libraryReducer,
        session: sessionReducer,
    },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
