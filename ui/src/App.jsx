import { ToastContainer } from "react-toastify";
import { MainProvider } from "./context/context";

function App() {
  return (
    <MainProvider>
      <ToastContainer />
    </MainProvider>
  );
}

export default App;