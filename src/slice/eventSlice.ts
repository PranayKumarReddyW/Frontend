import { createSlice } from "@reduxjs/toolkit";

const getEventsFromLocalStorage = () => {
  const storedEvents = localStorage.getItem("events");
  return storedEvents ? JSON.parse(storedEvents) : [];
};

const initialState = {
  events: getEventsFromLocalStorage(),
};

const eventSlice = createSlice({
  name: "events",
  initialState,
  reducers: {
    setEvents: (state, action) => {
      if (!Array.isArray(action.payload)) return state;
      localStorage.setItem("events", JSON.stringify(action.payload));
      return { events: action.payload };
    },
    clearEvents: (state) => {
      localStorage.removeItem("events");
      return { events: [] };
    },
  },
});

export const { setEvents, clearEvents } = eventSlice.actions;
export default eventSlice.reducer;
