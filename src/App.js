import "./App.css";
import AccountArea from "./Test";
import { BrowserRouter } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <AccountArea />
      </div>
    </BrowserRouter>
  );
}

export default App;
