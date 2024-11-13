import { configureStore } from "@reduxjs/toolkit";
import { auth } from "../services/auth";
import { rtkQueryErrorLogger } from "./middlewares";

export const store = configureStore({
    reducer: {
        [auth.reducerPath]: auth.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(
            auth.middleware,
            rtkQueryErrorLogger
        ),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
