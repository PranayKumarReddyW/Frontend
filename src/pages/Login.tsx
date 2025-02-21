import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "../slice/userSlice";
import { LoginForm } from "@/components/login-form";
import AlertSuccessDemo from "@/components/sucees-alert";
import AlertErrorDemo from "@/components/error-alert";
import { RootState } from "../store";

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

export default function Login() {
  interface AuthDetails {
    email: string;
    password: string;
  }

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.user);
  const [loginData, setLoginData] = useState<AuthDetails>({
    email: "",
    password: "",
  });

  const [showSuccess, setShowSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLoginData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        `${BASE_URL}/api/users/login`,
        loginData,
        {
          withCredentials: true,
        }
      );

      if (response.status !== 200) {
        throw new Error(response.data.message || "Invalid credentials");
      }

      dispatch(addUser(response.data.user));
      setShowSuccess(true);
      setErrorMessage("");

      setTimeout(() => {
        setShowSuccess(false);
      }, 2000);

      navigate("/dashboard");
    } catch (error: any) {
      console.log("Login error:", error);

      if (error.response) {
        // Backend responded with an error status (e.g., 400, 401, 403)
        setErrorMessage(
          error.response.data.message || "Invalid email or password"
        );
      } else if (error.request) {
        // Request was made but no response received
        setErrorMessage("Server is not responding. Try again later.");
      } else {
        // Some other error occurred
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
