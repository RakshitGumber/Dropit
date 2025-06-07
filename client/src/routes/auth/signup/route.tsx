import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import * as api from "@/api";
import "./signup.scss";
import { useAuthStore } from "@/store/authStore";

export const Route = createFileRoute("/auth/signup")({
  component: RouteComponent,
});

interface SignupResponse {
  username: string;
  password: string;
  email: string;
}

function RouteComponent() {
  const [data, setData] = useState<SignupResponse>({
    username: "",
    password: "",
    email: "",
  });
  const setToken = useAuthStore((state) => state.setToken);
  const [_, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const submitForm = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    try {
      const response = await api.signupUser(data);
      if (response.status === 200) {
        navigate({ to: "/auth/login" });
      }
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <div className="form-page">
      <form className="form-container">
        <h1>Create Account</h1>
        <div className="form-item">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            name="username"
            onChange={(e) => handleChange(e)}
          />
        </div>
        <div className="form-item">
          <label htmlFor="email">Email</label>
          <input type="email" name="email" onChange={(e) => handleChange(e)} />
        </div>
        <div className="form-item">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            onChange={(e) => handleChange(e)}
          />
        </div>
        <button className="form-button" onClick={(e) => submitForm(e)}>
          Send
        </button>
      </form>
    </div>
  );
}
