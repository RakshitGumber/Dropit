import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import * as api from "../api";

export const Route = createFileRoute("/")({
  component: RouteComponent,
});

interface LoginResponse {
  username: string;
  password: string;
  email: string;
}

function RouteComponent() {
  const [data, setData] = useState<LoginResponse>({
    username: "",
    password: "",
    email: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const submitForm = async () => {
    const user = await api.createUser(data);
    console.log(user, data);
  };

  return (
    <>
      <label htmlFor="username">Username</label>
      <input type="text" name="username" onChange={(e) => handleChange(e)} />
      <label htmlFor="email">Email</label>
      <input type="email" name="email" onChange={(e) => handleChange(e)} />
      <label htmlFor="password">Password</label>
      <input
        type="password"
        name="password"
        onChange={(e) => handleChange(e)}
      />
      <button onClick={submitForm}>Send</button>
    </>
  );
}
