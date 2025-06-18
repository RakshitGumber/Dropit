import { createFileRoute, useNavigate } from "@tanstack/react-router";
import "./preregister.scss";
import { Icon } from "@iconify/react/dist/iconify.js";
import { useState } from "react";
import toast from "react-hot-toast";
import * as api from "@/api";

export const Route = createFileRoute("/(waitlist)/preregister")({
  component: RouteComponent,
});

function RouteComponent() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ username: "", email: "" });
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateEmail = (email: string) => {
    return /\S+@\S+\.\S+/.test(email);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const { username, email } = formData;

    if (!username || !email) {
      toast.error("Please fill in all fields.");
      return;
    }

    if (!validateEmail(email)) {
      toast.error("Please enter a valid email address.");
      return;
    }

    try {
      setLoading(true);

      const { data } = await api.preregisterUser(formData);
      if (!data) {
        throw new Error("Registration failed");
      }

      toast.success("You're in! Welcome aboard 🎉");

      setTimeout(() => {
        navigate({ to: "/waitlist" });
      }, 1000);
    } catch (err) {
      toast.error("Something went wrong. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="preregister">
      <button
        className="backbutton"
        onClick={() => navigate({ to: "/waitlist" })}
      >
        <Icon icon="fa:arrow-left" />
      </button>
      <div className="form-container">
        <h1>Join the Waitlist</h1>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="username">Username</label>
            <input
              type="text"
              name="username"
              placeholder="JohnDoe"
              value={formData.username}
              onChange={handleChange}
            />
          </div>
          <div>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              name="email"
              placeholder="jdoe@example.com"
              value={formData.email}
              onChange={handleChange}
            />
          </div>
          <span>Join waitlist to get future updates</span>
          <button type="submit" disabled={loading}>
            {loading ? "Joining..." : "Join"}
          </button>
        </form>
      </div>
    </main>
  );
}
