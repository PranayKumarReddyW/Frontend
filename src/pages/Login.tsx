import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { LoginForm } from "@/components/login-form";
import AlertSuccessDemo from "@/components/sucees-alert";
import AlertErrorDemo from "@/components/error-alert";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export default function Login() {
  interface AuthDetails {
    email: string;
    password: string;
  }

  const navigate = useNavigate();
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
        `${API_BASE_URL}/api/users/login`,
        loginData
      );

      if (response.status === 200) {
        setShowSuccess(true);
        setErrorMessage("");

        setTimeout(() => {
          setShowSuccess(false);
        }, 2000);
        navigate("/dashboard");
      } else {
        setErrorMessage("Login failed. Please try again.");
      }
    } catch (error: any) {
      if (error.response) {
        setErrorMessage(error.response.data.message || "Login failed.");
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
