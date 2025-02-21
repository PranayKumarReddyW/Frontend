import { createSlice } from "@reduxjs/toolkit";

// Function to get the stored role from localStorage
const getRoleFromLocalStorage = () => {
  const storedRole = localStorage.getItem("role");
  return storedRole ? JSON.parse(storedRole) : null;
};

// Initial state, using localStorage if available
const initialState = getRoleFromLocalStorage() || {
  role: "",
};

const roleSlice = createSlice({
  name: "role",
  initialState,
  reducers: {
    setRole: (state, action) => {
      if (typeof action.payload !== "string") return state;
      localStorage.setItem("role", JSON.stringify(action.payload));
      return { ...state, role: action.payload };
    },
    clearRole: () => {
      localStorage.removeItem("role");
      return { role: "" };
    },
  },
});

export const { setRole, clearRole } = roleSlice.actions;
export default roleSlice.reducer;
