import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "./slice/counterSlice";
import userReducer from "./slice/userSlice";
import eventReducer from "./slice/eventSlice";
export const store = configureStore({
  reducer: {
    counter: counterReducer,
    user: userReducer,
    event: eventReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
  