import React from "react";
import { useAuth } from "@/context/authContext";
import SignIn from "./signIn";
import ChatPage from "./chatPage";

const HomePage = () => {
  const { isLoggedIn } = useAuth();

  return <div>{isLoggedIn ? <ChatPage /> : <SignIn />}</div>;
};

export default HomePage;
