import { useParams } from "react-router-dom";
import { useState } from "react";

export default function ChatPanel() {
  const [messages, setMessages] = useState([
    {
      id: "1",
      content: "Hi Bob, how are you?",
      createdAt: "2023-10-01T10:15:30Z",
      conversationId: "12345",
      sender: {
        id: "user1",
        name: "Rabi",
        email: "alice@example.com",
      },
    },
    {
      id: "2",
      content: "Hey Alice! I'm good, thanks. How about you?",
      createdAt: "2023-10-01T10:16:45Z",
      conversationId: "12345",
      sender: {
        id: "user2",
        name: "Bob",
        email: "bob@example.com",
      },
    },
    {
      id: "3",
      content: "I'm doing great, thanks for asking!",
      createdAt: "2023-10-01T10:17:20Z",
      conversationId: "12345",
      sender: {
        id: "user1",
        name: "Rabi",
        email: "alice@example.com",
      },
    },
  ]);
  const [newMessage, setNewMessage] = useState("");
  const { userId } = useParams();

  const handleSendMessage = () => {
    if (newMessage.trim() === "") return;

    const message = {
      id: String(messages.length + 1),
      content: newMessage,
      createdAt: new Date().toISOString(),
      conversationId: "12345",
      sender: {
        id: "user1",
        name: "Rabi",
        email: "alice@example.com",
      },
    };
    setMessages([...messages, message]);
    setNewMessage("");
  };
  console.log(messages);

  return (
    <div className="flex flex-col h-screen bg-gray-100 p-4">
      <div className="bg-whtie p-4 shadow-md rounded-t-lg">
        <h1 className="text-xl font-semibold">Messages</h1>
      </div>

      <div className="flex-1 overflow-y-auto p-4 bg-white mt-2 rounded-b-lg">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${
              message.sender.id === "user1" ? "justify-end" : "justify-start"
            } mb-4`}>
            <div
              className={`max-w-[70%] p-3 rounded-lg ${
                message.sender.id === "user1"
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200 text-gray-800"
              }`}>
              <p className="text-sm">{message.content}</p>
              <p className="text-xs text-gray-400 mt-1">
                {new Date(message.createdAt).toLocaleTimeString()}
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-white p-4 shadow-md rounded-lg mt-2">
        <div className="flex gap-2">
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                handleSendMessage();
              }
            }}
            placeholder="Type a message..."
            className="flex-1 p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
          />
          <button
            onClick={handleSendMessage}
            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors">
            Send
          </button>
        </div>
      </div>
    </div>
  );
}
