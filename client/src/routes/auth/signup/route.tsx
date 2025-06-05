import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import * as api from "@/api";

export const Route = createFileRoute("/auth/signup")({
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

      <section style={{ background: "#F8F9FA", padding: "2rem" }}>
        <header>
          <h1>Welcome to Otaku World</h1>
          <p>
            Discover top-rated anime, latest blogs, and fan theories curated
            with style.
          </p>
          <button class="btn primary">Explore Blogs</button>
          <button class="btn cta">Join Community</button>
        </header>

        <div class="card">
          <div class="tag">Featured</div>
          <h2>Top Anime of the Week</h2>
          <p>
            Explore this week's most loved anime shows, handpicked by our
            editorial team!
          </p>
        </div>
      </section>
    </>
  );
}
