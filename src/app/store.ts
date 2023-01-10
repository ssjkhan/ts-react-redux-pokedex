import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import pokeApi from "../services/pokeApi";

export const store = configureStore({
	reducer: {
		[pokeApi.reducerPath]: pokeApi.reducer,
	},
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({
			serializableCheck: false,
		}).concat(pokeApi.middleware),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
	ReturnType,
	RootState,
	unknown,
	Action<string>
>;
