import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import { Routes, Route } from "react-router-dom";
import SignUp from "./Pages/signUp";
import SignIn from "./Pages/signIn";
import Home from "./Pages/homePage";
import Sidebar from "./components/sidePanel";
import ChatPanel from "./components/chatPanel";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />}>
        <Route path="/chats/:userId" element={<Home />} />
      </Route>
      <Route path="/signup" element={<SignUp />} />
      <Route path="/signin" element={<SignIn />} />
      {/* <Route path="/sidebar" element={<Sidebar />} />
      <Route path="/chatpanel" element={<ChatPanel />} /> */}
    </Routes>
  );
}

export default App;
