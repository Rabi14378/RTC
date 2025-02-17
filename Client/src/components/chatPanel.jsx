import { useParams } from "react-router-dom";
import { useEffect, useState, useRef } from "react";

const dummyChats = [
  {
    id: 1,
    content: "Hey Bob, how are you?",
    senderId: 1,
    conversationId: 1,
    createdAt: "2023-10-01T08:00:00Z",
    updatedAt: "2023-10-01T08:00:00Z",
  },
  {
    id: 2,
    content: "I'm good, Alice! How about you?",
    senderId: 2,
    conversationId: 1,
    createdAt: "2023-10-01T08:05:00Z",
    updatedAt: "2023-10-01T08:05:00Z",
  },
  {
    id: 3,
    content: "I'm doing great, thanks for asking!",
    senderId: 1,
    conversationId: 1,
    createdAt: "2023-10-01T08:10:00Z",
    updatedAt: "2023-10-01T08:10:00Z",
  },
  {
    id: 4,
    content: "Want to grab lunch later?",
    senderId: 1,
    conversationId: 1,
    createdAt: "2023-10-01T08:15:00Z",
    updatedAt: "2023-10-01T08:15:00Z",
  },
  {
    id: 5,
    content: "Sure, what time?",
    senderId: 2,
    conversationId: 1,
    createdAt: "2023-10-01T08:20:00Z",
    updatedAt: "2023-10-01T08:20:00Z",
  },
  {
    id: 6,
    content: "Hey Charlie, are you free tomorrow?",
    senderId: 1,
    conversationId: 2,
    createdAt: "2023-10-02T09:00:00Z",
    updatedAt: "2023-10-02T09:00:00Z",
  },
  {
    id: 7,
    content: "Yes, I am. What's up?",
    senderId: 3,
    conversationId: 2,
    createdAt: "2023-10-02T09:05:00Z",
    updatedAt: "2023-10-02T09:05:00Z",
  },
  {
    id: 8,
    content: "Let's meet for coffee.",
    senderId: 1,
    conversationId: 2,
    createdAt: "2023-10-02T09:10:00Z",
    updatedAt: "2023-10-02T09:10:00Z",
  },
  {
    id: 9,
    content: "Sounds good! What time?",
    senderId: 3,
    conversationId: 2,
    createdAt: "2023-10-02T09:15:00Z",
    updatedAt: "2023-10-02T09:15:00Z",
  },
  {
    id: 10,
    content: "How about 3 PM?",
    senderId: 1,
    conversationId: 2,
    createdAt: "2023-10-02T09:20:00Z",
    updatedAt: "2023-10-02T09:20:00Z",
  },
  {
    id: 11,
    content: "Hey Diana, can you send me the report?",
    senderId: 1,
    conversationId: 3,
    createdAt: "2023-10-03T10:00:00Z",
    updatedAt: "2023-10-03T10:00:00Z",
  },
  {
    id: 12,
    content: "Sure, I'll send it in a few minutes.",
    senderId: 4,
    conversationId: 3,
    createdAt: "2023-10-03T10:05:00Z",
    updatedAt: "2023-10-03T10:05:00Z",
  },
  {
    id: 13,
    content: "Thanks, Diana!",
    senderId: 1,
    conversationId: 3,
    createdAt: "2023-10-03T10:10:00Z",
    updatedAt: "2023-10-03T10:10:00Z",
  },
  {
    id: 14,
    content: "No problem! Let me know if you need anything else.",
    senderId: 4,
    conversationId: 3,
    createdAt: "2023-10-03T10:15:00Z",
    updatedAt: "2023-10-03T10:15:00Z",
  },
  {
    id: 15,
    content: "Hey Eve, did you finish the presentation?",
    senderId: 1,
    conversationId: 4,
    createdAt: "2023-10-04T11:00:00Z",
    updatedAt: "2023-10-04T11:00:00Z",
  },
  {
    id: 16,
    content: "Almost done. I'll send it to you soon.",
    senderId: 5,
    conversationId: 4,
    createdAt: "2023-10-04T11:05:00Z",
    updatedAt: "2023-10-04T11:05:00Z",
  },
  {
    id: 17,
    content: "Great, thanks!",
    senderId: 1,
    conversationId: 4,
    createdAt: "2023-10-04T11:10:00Z",
    updatedAt: "2023-10-04T11:10:00Z",
  },
  {
    id: 18,
    content: "No worries! It'll be ready in 10 minutes.",
    senderId: 5,
    conversationId: 4,
    createdAt: "2023-10-04T11:15:00Z",
    updatedAt: "2023-10-04T11:15:00Z",
  },
  {
    id: 19,
    content: "Hey Frank, can you review this document?",
    senderId: 1,
    conversationId: 5,
    createdAt: "2023-10-05T12:00:00Z",
    updatedAt: "2023-10-05T12:00:00Z",
  },
  {
    id: 20,
    content: "Sure, send it over.",
    senderId: 6,
    conversationId: 5,
    createdAt: "2023-10-05T12:05:00Z",
    updatedAt: "2023-10-05T12:05:00Z",
  },
  {
    id: 21,
    content: "Thanks, Frank!",
    senderId: 1,
    conversationId: 5,
    createdAt: "2023-10-05T12:10:00Z",
    updatedAt: "2023-10-05T12:10:00Z",
  },
  {
    id: 22,
    content: "No problem. I'll get back to you by EOD.",
    senderId: 6,
    conversationId: 5,
    createdAt: "2023-10-05T12:15:00Z",
    updatedAt: "2023-10-05T12:15:00Z",
  },
];
const userId = 1;
export default function ChatPanel({ setChats }) {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const { chatId } = useParams();
  const messagesEndRef = useRef(null);

  useEffect(() => {
    if (!chatId) return;

    const thisConversation = dummyChats.filter(
      (chat) => chat.conversationId == chatId
    );

    setMessages(thisConversation);
  }, [chatId]);

  const handleSendMessage = () => {
    if (newMessage.trim() === "") return;
    const message = {
      id: String(messages.length + newMessage.length),
      content: newMessage,
      createdAt: new Date().toISOString(),
      conversationId: "12345",
      senderId: userId,
    };
    setMessages([...messages, message]);
    setChats((prevChats) =>
      prevChats.map((chat) =>
        chat.id == chatId
          ? {
              ...chat,
              messages: chat.messages.map((msg, index) =>
                index === 0
                  ? {
                      ...msg,
                      content: message.content,
                      createdAt: new Date().toISOString(),
                    }
                  : msg
              ),
            }
          : chat
      )
    );
    setNewMessage("");
  };
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="flex flex-col h-screen w-2/3 bg-gray-100 p-4">
      {!chatId ? (
        <h4>select the user to chat with him/her</h4>
      ) : (
        <>
          <div className="bg-whtie p-4 shadow-md rounded-t-lg">
            <h1 className="text-xl font-semibold">Messages</h1>
          </div>

          <div className="flex-1 overflow-y-auto p-4 bg-white mt-2 rounded-b-lg">
            {messages?.map((message) => (
              <div
                key={message.id}
                className={`flex ${
                  message.senderId == userId ? "justify-end" : "justify-start"
                } mb-4`}>
                <div
                  className={`max-w-[70%] p-3 rounded-lg ${
                    message.senderId == userId
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
            <div ref={messagesEndRef} />
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
        </>
      )}
    </div>
  );
}
