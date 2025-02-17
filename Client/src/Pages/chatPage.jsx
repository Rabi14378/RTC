import ChatPanel from "@/components/chatPanel";
import SidePanel from "@/components/sidePanel";
import { useState } from "react";

export default function ChatPage() {
  // todo: api call for conversation list here and pass to SidePanel

  const [chats, setChats] = useState([
    {
      id: 1,
      participants: [
        {
          user: {
            id: 2,
            name: "Bob",
            email: "bob@example.com",
            avatar: "https://example.com/avatars/bob.png",
          },
        },
      ],
      messages: [
        {
          content: "I'm good, Alice! How about you?",
          createdAt: "2023-10-02T09:10:00Z",
        },
      ],
    },
    {
      id: 2,
      participants: [
        {
          user: {
            id: 3,
            name: "Charlie",
            email: "charlie@example.com",
            avatar: "https://example.com/avatars/charlie.png",
          },
        },
      ],
      messages: [
        {
          content: "Sure, what time?",
          createdAt: "2023-10-03T10:20:00Z",
        },
      ],
    },
    {
      id: 3,
      participants: [
        {
          user: {
            id: 4,
            name: "Diana",
            email: "diana@example.com",
            avatar: "https://example.com/avatars/diana.png",
          },
        },
      ],
      messages: [
        {
          content: "Let's meet at 5 PM.",
          createdAt: "2023-10-04T11:30:00Z",
        },
      ],
    },
    {
      id: 4,
      participants: [
        {
          user: {
            id: 5,
            name: "Eve",
            email: "eve@example.com",
            avatar: "https://example.com/avatars/eve.png",
          },
        },
      ],
      messages: [
        {
          content: "Sounds good!",
          createdAt: "2023-10-05T12:40:00Z",
        },
      ],
    },
    {
      id: 5,
      participants: [
        {
          user: {
            id: 6,
            name: "Frank",
            email: "frank@example.com",
            avatar: "https://example.com/avatars/frank.png",
          },
        },
      ],
      messages: [
        {
          content: "Can you send me the details?",
          createdAt: "2023-10-06T13:50:00Z",
        },
      ],
    },
    {
      id: 6,
      participants: [
        {
          user: {
            id: 7,
            name: "Grace",
            email: "grace@example.com",
            avatar: "https://example.com/avatars/grace.png",
          },
        },
      ],
      messages: [
        {
          content: "I'll send them right away.",
          createdAt: "2023-10-07T14:00:00Z",
        },
      ],
    },
    {
      id: 7,
      participants: [
        {
          user: {
            id: 8,
            name: "Hank",
            email: "hank@example.com",
            avatar: "https://example.com/avatars/hank.png",
          },
        },
      ],
      messages: [
        {
          content: "Thanks!",
          createdAt: "2023-10-08T15:10:00Z",
        },
      ],
    },
    {
      id: 8,
      participants: [
        {
          user: {
            id: 9,
            name: "Ivy",
            email: "ivy@example.com",
            avatar: "https://example.com/avatars/ivy.png",
          },
        },
      ],
      messages: [
        {
          content: "No problem!",
          createdAt: "2023-10-09T16:20:00Z",
        },
      ],
    },
    {
      id: 9,
      participants: [
        {
          user: {
            id: 10,
            name: "Jack",
            email: "jack@example.com",
            avatar: "https://example.com/avatars/jack.png",
          },
        },
      ],
      messages: [
        {
          content: "See you tomorrow.",
          createdAt: "2023-10-10T17:30:00Z",
        },
      ],
    },
    {
      id: 10,
      participants: [
        {
          user: {
            id: 11,
            name: "Karen",
            email: "karen@example.com",
            avatar: "https://example.com/avatars/karen.png",
          },
        },
      ],
      messages: [
        {
          content: "Looking forward to it!",
          createdAt: "2023-10-11T18:40:00Z",
        },
      ],
    },
  ]);
  return (
    <div className="flex h-screen bg-gray-100">
      <SidePanel chatList={chats} />
      <ChatPanel setChats={setChats} />
    </div>
  );
}
