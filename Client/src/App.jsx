import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import { Routes, Route } from "react-router-dom";
import SignUp from "./Pages/signUp";
import SignIn from "./Pages/signIn";
import ChatPage from "./Pages/chatPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<ChatPage />}>
        <Route path="/chats/:userId" element={<ChatPage />} />
      </Route>
      <Route path="/signup" element={<SignUp />} />
      <Route path="/signin" element={<SignIn />} />
      {/* <Route path="/sidebar" element={<Sidebar />} />
      <Route path="/chatpanel" element={<ChatPanel />} /> */}
    </Routes>
  );
}

export default App;
