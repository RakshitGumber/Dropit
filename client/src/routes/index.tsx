import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";

import { postName } from "@/api";

export const Route = createFileRoute("/")({
  component: RouteComponent,
});

function RouteComponent() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const submitForm = () => {
    if (name !== "" && email !== "")
      console.log("Name:", name, "Email:", email);
    postName(name, email).then((res) => console.log(res));
  };

  return (
    <form
      className="flex flex-col gap-4 p-4 border rounded-sm w-64 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-card shadow-lg"
      onSubmit={(e) => {
        e.preventDefault();
        submitForm();
      }}
    >
      <Label>Name</Label>
      <Input
        type="text"
        placeholder="Name"
        onBlur={(e) => setName(e.target.value)}
      ></Input>
      <Label>Email</Label>
      <Input
        type="email"
        placeholder="Email"
        onBlur={(e) => setEmail(e.target.value)}
      ></Input>
      <Button type="submit">Submit</Button>
    </form>
  );
}
