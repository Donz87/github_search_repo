import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { githubApi } from "./github/github.api";
import { githubReduser } from "./github/github.slice";


export const store = configureStore({
    reducer: {
        [githubApi.reducerPath] : githubApi.reducer,
        github: githubReduser
    },
    middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(githubApi.middleware),
})

setupListeners(store.dispatch)

export type RootState =  ReturnType<typeof store.getState>