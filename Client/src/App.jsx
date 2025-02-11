import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import { Routes, Route } from "react-router-dom";
import SignUp from "./Pages/signUp";
import SignIn from "./Pages/signIn";
import Home from "./Pages/homePage";
import Sidebar from "./components/sidePanel";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/signin" element={<SignIn />} />
      <Route path="/sidebar" element={<Sidebar />} />
    </Routes>
  );
}

export default App;
