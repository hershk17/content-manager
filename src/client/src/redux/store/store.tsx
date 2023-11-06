import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "../counter/counterSlice";
import isLoadingReducer from "../isLoading/isLoadingSlice";

export const store = configureStore({
    reducer: {
        counter: counterReducer,
        isLoading: isLoadingReducer,
    },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
