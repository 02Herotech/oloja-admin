import { configureStore } from "@reduxjs/toolkit";
import { auth } from "@/services/auth";
import { rtkQueryErrorLogger } from "./middlewares";
import {users} from "@/services/users";
import {admin} from "@/services/users/admin";
import {analysis} from "@/services/adminAnalysis";

export const store = configureStore({
    reducer: {
        [auth.reducerPath]: auth.reducer,
        [users.reducerPath]: users.reducer,
        [analysis.reducerPath]: analysis.reducer,
        [admin.reducerPath]: admin.reducer
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(
            auth.middleware,
            users.middleware,
            analysis.middleware,
            rtkQueryErrorLogger
        ),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
