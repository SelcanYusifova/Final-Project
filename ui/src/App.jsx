import { ToastContainer } from "react-toastify";
import { MainProvider } from "./context/context";
import "../i18n";

function App() {
  return (
    <MainProvider>
      <ToastContainer />
    </MainProvider>
  );
}

export default App;