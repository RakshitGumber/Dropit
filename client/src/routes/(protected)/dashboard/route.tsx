import { useAuthStore } from "@/store/authStore";
import { useFlowStore } from "@/store/flowStore";
import { createFileRoute, redirect, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import * as api from "@/api";

export const Route = createFileRoute("/(protected)/dashboard")({
  beforeLoad: () => {
    const token = useAuthStore.getState().token;
    if (!token) {
      throw redirect({ to: "/auth/login" });
    }
  },
  component: RouteComponent,
});

function RouteComponent() {
  const { user } = useAuthStore((state) => state);
  const [showCreatePopup, setShowCreatePopup] = useState(false);
  const [flowName, setFlowName] = useState("Untitled");
  const navigate = useNavigate();
  const userId = useAuthStore((state) => state.user?.user_id);
  const [myFlows, setMyFlows] = useState([]);

  const CreateFlow = async (e: any) => {
    e.preventDefault();
    const data = await useFlowStore.getState().createFlow(flowName);
    if (data.status === 200) {
      navigate({ to: `../flow/${data.id}` });
    }
  };

  useEffect(() => {
    if (!userId) return; // user not loaded yet

    const fetchFlows = async () => {
      try {
        const data = await api.getMyFlows(userId);
        if (data.status === 200) {
          setMyFlows(data.data);
        }
      } catch (error) {
        console.error("Error fetching flows:", error);
      }
    };

    fetchFlows();
  }, [userId]);

  return (
    <div>
      <h1>Welcome {user?.username}</h1>
      <button onClick={() => setShowCreatePopup(true)}>Create Flow</button>
      {showCreatePopup && (
        <div>
          <button onClick={() => setShowCreatePopup(false)}>X</button>
          <form>
            <label htmlFor="name">Name</label>
            <input
              type="text"
              name="name"
              value={flowName}
              onChange={(e) => setFlowName(e.target.value)}
            />
            <button onClick={(e) => CreateFlow(e)}>Create</button>
          </form>
        </div>
      )}
      <ul>
        {myFlows.map((flow) => {
          return (
            // @ts-ignore
            <li key={flow.id}>
              {
                // @ts-ignore
                <a href={`./flow/${flow.id}`}>{flow.name}</a>
              }
            </li>
          );
        })}
      </ul>
    </div>
  );
}
