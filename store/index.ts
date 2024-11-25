import { configureStore } from "@reduxjs/toolkit";
import { auth } from "@/services/auth";
import { rtkQueryErrorLogger } from "./middlewares";
import {users} from "@/services/users";

export const store = configureStore({
    reducer: {
        [auth.reducerPath]: auth.reducer,
        [users.reducerPath]: users.reducer
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(
            auth.middleware,
            users.middleware,
            rtkQueryErrorLogger
        ),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
