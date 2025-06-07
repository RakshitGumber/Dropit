import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import * as api from "@/api";
import { useAuthStore } from "@/store/authStore";
import "./login.scss";

export const Route = createFileRoute("/auth/login")({
  component: RouteComponent,
});

interface LoginResponse {
  email: string;
  password: string;
}

function RouteComponent() {
  const [data, setData] = useState<LoginResponse>({
    email: "",
    password: "",
  });
  const [_, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const setToken = useAuthStore((state) => state.setToken);

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
      const response = await api.loginUser(data);
      if (response.status === 200) {
        setToken(response.data.access_token);
        navigate({ to: "/dashboard" });
      }
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <div className="form-page">
      <form className="form-container">
        <h1>Welcome Back</h1>
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
      <span>
        New User? <Link to="/auth/signup">Click Here</Link>
      </span>
    </div>
  );
}
