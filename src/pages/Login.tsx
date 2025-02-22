import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "../slice/userSlice";
import { setRole } from "../slice/roleSlice"; // Import setRole action
import { LoginForm } from "@/components/login-form";
import AlertSuccessDemo from "@/components/sucees-alert";
import AlertErrorDemo from "@/components/error-alert";
import { RootState } from "../store"; // Assuming this is your root state type

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

// Define the structure of the login data
interface LoginData {
  email: string;
  password: string;
  role: string;
}

// Define the response structure for the login API call
interface LoginResponse {
  message?: string; // Optional message in the response
  user: {
    email: string;
    role: string | null;
    [key: string]: any; // You can add more properties here depending on the user object
  };
}

export default function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.user);
  const [loginData, setLoginData] = useState<LoginData>({
    email: "",
    password: "",
    role: "users",
  });

  const [showSuccess, setShowSuccess] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLoginData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await axios.post<LoginResponse>(
        `${BASE_URL}/api/users/login`,
        loginData,
        {
          withCredentials: true,
        }
      );

      if (response.status === 200) navigate("/events");

      // Check if the response status is 200
      if (response.status === 200 && response.data.user) {
        // If login is successful, add user to the state
        dispatch(addUser(response.data.user));

        // Add role to the roleSlice
        dispatch(setRole(response.data.user.role || "student"));

        setShowSuccess(true);
        setErrorMessage("");

        setTimeout(() => {
          setShowSuccess(false);
        }, 2000);

        // Redirect to dashboard
        navigate("/events");
      } else {
        // Handle non-200 status codes
        setErrorMessage(
          response.data.message || "Login failed. Please try again."
        );
      }
    } catch (error: any) {
      console.log("Login error:", error);

      if (error.response) {
        setErrorMessage(
          error.response.data.message || "Invalid email or password"
        );
      } else if (error.request) {
        setErrorMessage("Server is not responding. Try again later.");
      } else {
        setErrorMessage("An unexpected error occurred.");
      }
    }
  };

  return (
    <div className="relative flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm">
        {showSuccess && (
          <AlertSuccessDemo title="Success" description="Login successful!" />
        )}
        {errorMessage && (
          <AlertErrorDemo title="Error" description={errorMessage} />
        )}

        {/* Removed the form tag here */}
        <LoginForm
          auth={loginData}
          setAuth={setLoginData}
          handleChange={handleChange}
          onSubmit={handleSubmit}
        />
      </div>
    </div>
  );
}
