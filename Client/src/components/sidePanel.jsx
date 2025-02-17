import { useState } from "react";
import Search from "./searchPanel";
import ChatItem from "./chatItem";
import { useNavigate } from "react-router-dom";
export default function SidePanel({ chatList }) {
  // const [selectedUser, setSelectedUser] = useState(null);
  const [searchedUsers, setSearchedUsers] = useState([]);
  const [searching, setSearching] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedChat, setSelectedChat] = useState(null);
  const navigate = useNavigate();

  const searchHandler = (qUsers, query, focused) => {
    setSearching(focused);
    setSearchQuery(query);
    setSearchedUsers(qUsers);
  };

  const chatItemClickHandler = (chatId) => {
    setSelectedChat(chatId);
    console.log("Clicked user:", chatId);
    navigate(`/chats/${chatId}`);
  };

  const sortedChatList = [...chatList].sort((a, b) => {
    const latestMessageA = a.messages[0].createdAt;
    const latestMessageB = b.messages[0].createdAt;
    return new Date(latestMessageA) - new Date(latestMessageB);
  });

  return (
    <>
      <div className="w-1/3 bg-white border-r border-gray-200 flex flex-col">
        <div className="p-4 border-b border-gray-200">
          <h2 className="text-xl font-semibold">Let's Chat</h2>
        </div>
        <div className="p-4 border-b border-gray-200">
          <Search onSearch={searchHandler} />
        </div>
        <div className="flex-1 overflow-y-auto">
          {searching ? (
            searchedUsers.length > 0 ? (
              searchedUsers.map((user) => (
                <ChatItem
                  key={user.id}
                  user={user}
                  searched={true}
                  isSelected={false}
                  onClick={() => chatItemClickHandler(user.id)}

                  //todo: maybe make searchItemClickHandler and handler the new conversation on another route maybe!!
                />
              ))
            ) : (
              searchQuery && <li>No results found</li>
            )
          ) : sortedChatList.length > 0 ? (
            sortedChatList.map((chat) => (
              <ChatItem
                key={chat.id}
                user={chat.participants[0].user}
                lastMessage={chat.messages[0].content}
                isSelected={chat.id === selectedChat}
                searched={false}
                onClick={() => chatItemClickHandler(chat.id)}
              />
            ))
          ) : (
            <li>No Contact added!</li>
          )}
        </div>
      </div>
    </>
  );
}

// export default function Sidebar() {
//   const [searchResults, setSearchResults] = useState([]);
//   const [query, setQuery] = useState("");
//   const [isFocused, setIsFocused] = useState(false);

//   const handleSearchResults = (results, q, f) => {
//     setSearchResults(results);
//     setQuery(q);
//     setIsFocused(f);
//   };
//   console.log(searchResults);

//   return (
//     <div>
//       <h1>Search Results</h1>
//       <Search onSearch={handleSearchResults} />

//       {isFocused ? (
//         <ul>
//           {searchResults.length > 0
//             ? searchResults.map((result) => (
//                 <li key={result.id}>{result.name}</li>
//               ))
//             : query && <li>No results found</li>}
//         </ul>
//       ) : (
//         <ul>
//           {searchResults.length > 0
//             ? users.map((user) => (
//                 <li key={user.id}>{user.name}</li>
//               ))
//             : <li>No users connected</li>}
//         </ul>
//       )}
//     </div>
//   );
// }
