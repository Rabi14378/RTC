import { Routes, Route } from "react-router-dom";
import SignUp from "./Pages/signUp";
import SignIn from "./Pages/signIn";
import ChatPage from "./Pages/chatPage";
import VerifyEmail from "./Pages/verificationPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<ChatPage />}>
        <Route path="/chats/:chatId" element={<ChatPage />} />
      </Route>
      <Route path="/signup" element={<SignUp />} />
      <Route path="/signin" element={<SignIn />} />
      <Route path="/auth/verify/:verificationToken" element={<VerifyEmail />} />
      {/* <Route path="/chatpanel" element={<ChatPanel />} /> */}
    </Routes>
  );
}

export default App;
