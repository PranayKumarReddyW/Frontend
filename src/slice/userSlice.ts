import { createSlice } from "@reduxjs/toolkit";

const getUserFromLocalStorage = () => {
  const storedUser = localStorage.getItem("user");
  return storedUser ? JSON.parse(storedUser) : null;
};

const initialState = getUserFromLocalStorage() || {
  _id: null,
  name: "",
  registrationNumber: "",
  branch: "",
  passedOutYear: null,
  email: "",
  phoneNumber: "",
  registeredEvents: [],
  createdAt: "",
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    addUser: (state, action) => {
      if (!action.payload || typeof action.payload !== "object") return state;
      localStorage.setItem("user", JSON.stringify(action.payload));
      return { ...action.payload };
    },
    removeUser: () => {
      localStorage.removeItem("user");
      return {
        _id: null,
        name: "",
        registrationNumber: "",
        branch: "",
        passedOutYear: null,
        email: "",
        phoneNumber: "",
        registeredEvents: [],
        createdAt: "",
      };
    },
  },
});

export const { addUser, removeUser } = userSlice.actions;
export default userSlice.reducer;
