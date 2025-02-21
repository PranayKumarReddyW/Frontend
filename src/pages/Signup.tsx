import React, { useState } from "react";
import axios from "axios";
import SignupForm from "../components/signup";
import { formSchema } from "../components/form/form-schema";
import * as z from "zod";
import AlertSuccessDemo from "../components/sucees-alert";
import AlertErrorDemo from "../components/error-alert";

const Signup: React.FC = () => {
  const [showSuccess, setShowSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/api/users/register`,
        data,
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      if (response.status === 201) {
        setShowSuccess(true);
        setErrorMessage("");
        setTimeout(() => setShowSuccess(false), 3000);
      }
    } catch (error: any) {
      if (error.response) {
        setErrorMessage(error.response.data.message || "Signup failed");
      } else {
        setErrorMessage("An unexpected error occurred.");
      }
    }
  };

  return (
    <div className="relative">
      {showSuccess && (
        <AlertSuccessDemo
          title="Success"
          description="User registered successfully"
        />
      )}
      {errorMessage && (
        <AlertErrorDemo title="Error" description={errorMessage} />
      )}
      <SignupForm onSubmit={onSubmit} />
    </div>
  );
};

export default Signup;
