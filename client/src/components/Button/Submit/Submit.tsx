import { Button } from "@/components/ui/button";
import { useStore, type StoreState } from "@/store";
import { shallow } from "zustand/shallow";
import { toast } from "react-hot-toast";

const selector = (state: StoreState) => ({
  nodes: state.nodes,
  edges: state.edges,
});
export const Submit = () => {
  const { nodes, edges } = useStore(selector, shallow);

  const url = "https://dropit-er31.onrender.com/pipelines/parse";
  const submitButton = async () => {
    await toast.promise(
      postPipeline(),
      {
        loading: "Submitting...",
        success: (data) => (
          <div className="flex gap-3">
            <div>
              <span>Nodes: </span>
              <span>{data.num_nodes}</span>
            </div>
            <div>
              <span>Edges: </span>
              <span>{data.num_edges}</span>
            </div>
            <div>
              <span>isDag: </span>
              <span>{data.is_dag ? "Yes" : "No"}</span>
            </div>
          </div>
        ),
        error: "Error submitting pipeline",
      },
      {
        style: {
          backgroundColor: "hsl(var(--card))",
          color: "hsl(var(--card-forground))",
        },
      }
    );
  };

  const postPipeline = async () => {
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: `pipeline={"nodes":${JSON.stringify(
          nodes
        )},"edges":${JSON.stringify(edges)}}`,
      });
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const res = await response.json();
      return res;
    } catch (e) {}
  };

  return (
    <Button type="submit" variant="default" onClick={submitButton}>
      Submit
    </Button>
  );
};
