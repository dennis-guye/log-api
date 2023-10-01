import "./App.css";
import { LogSearchView } from "./components/LogSearchView";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <div className="App">
      <LogSearchView></LogSearchView>
      <ToastContainer></ToastContainer>
    </div>
  );
}

export default App;
