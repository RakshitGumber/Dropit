import { PipelineUI } from "./ui";
import { Header, Library } from "@/components";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <>
      <Header />
      <Library />
      <PipelineUI />
      <Toaster position="top-center" reverseOrder={false} />
    </>
  );
}

export default App;
