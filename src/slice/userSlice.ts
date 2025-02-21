import { createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";
import jwtDecode from "jwt-decode";

interface User {
  id: string;
  name: string;
  email: string;
  role?: string;
  [key: string]: any;
}

interface UserState {
  user: User | null;
  token: string | null;
  role: string | null;
}

// Utility function to decode token safely and extract role
const getUserFromToken = (): UserState => {
  const token = Cookies.get("token"); // Fetch token from cookies
  if (!token) return { user: null, token: null, role: null };

  try {
    const decodedUser = jwtDecode<User>(token); // Decode JWT
    return { user: decodedUser, token, role: decodedUser.role || null };
  } catch (error) {
    console.error("Invalid token:", error);
    return { user: null, token: null, role: null };
  }
};

const initialState: UserState = getUserFromToken();

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.role = null;
      Cookies.remove("token"); // Remove token from cookies
    },
  },
});

export const { logout } = userSlice.actions;
export default userSlice.reducer;
