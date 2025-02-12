import { Input } from "./ui/input";
import { useState } from "react";
import Search from "./searchPanel";

export default function SidePanel({ onUserSelected }) {
  const [users, setUsers] = useState([
    {
      id: 1,
      name: "John Doe",
      email: "john.doe@example.com",
      username: "johndoe",
      phone: "123-456-7890",
      address: "123 Main St, New York, NY",
    },
    {
      id: 2,
      name: "Jane Smith",
      email: "jane.smith@example.com",
      username: "janesmith",
      phone: "234-567-8901",
      address: "456 Elm St, Los Angeles, CA",
    },
    {
      id: 3,
      name: "Michael Johnson",
      email: "michael.johnson@example.com",
      username: "michaelj",
      phone: "345-678-9012",
      address: "789 Oak St, Chicago, IL",
    },
    {
      id: 4,
      name: "Emily Davis",
      email: "emily.davis@example.com",
      username: "emilyd",
      phone: "456-789-0123",
      address: "321 Maple St, Houston, TX",
    },
    {
      id: 5,
      name: "David Wilson",
      email: "david.wilson@example.com",
      username: "davidw",
      phone: "567-890-1234",
      address: "654 Pine St, Phoenix, AZ",
    },
    {
      id: 6,
      name: "Sarah Martinez",
      email: "sarah.martinez@example.com",
      username: "sarahm",
      phone: "678-901-2345",
      address: "987 Birch St, Philadelphia, PA",
    },
    {
      id: 7,
      name: "James Brown",
      email: "james.brown@example.com",
      username: "jamesb",
      phone: "789-012-3456",
      address: "135 Cedar St, San Antonio, TX",
    },
    {
      id: 8,
      name: "Olivia Taylor",
      email: "olivia.taylor@example.com",
      username: "oliviat",
      phone: "890-123-4567",
      address: "246 Redwood St, San Diego, CA",
    },
    {
      id: 9,
      name: "Daniel Anderson",
      email: "daniel.anderson@example.com",
      username: "daniela",
      phone: "901-234-5678",
      address: "357 Spruce St, Dallas, TX",
    },
    {
      id: 10,
      name: "Sophia Thomas",
      email: "sophia.thomas@example.com",
      username: "sophiat",
      phone: "012-345-6789",
      address: "468 Willow St, San Jose, CA",
    },
  ]);
  // const [selectedUser, setSelectedUser] = useState(null);
  const [searchedUsers, setSearchedUsers] = useState([]);
  const [searching, setSearching] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const searchHandler = (users, query, focused) => {
    setSearching(focused);
    setSearchQuery(query);
    setSearchedUsers((e) => [...e, users]);
  };

  const userSelectHandler = () => {
    onSelect(user);
  };
  let data;

  return (
    <div className="flex h-screen bg-gray-100">
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
                <div
                  key={user.id}
                  className="p-4 hover:bg-gray-50 cursor-pointer">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <img
                        className="h-10 w-10 rounded-full"
                        src="https://via.placeholder.com/150"
                        alt="User Avatar"
                      />
                    </div>
                    <div className="ml-3">
                      <p className="text-sm font-medium text-gray-900">
                        {user.name}
                      </p>
                      <p className="text-sm text-gray-500">Last message...</p>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              query && <li>No results found</li>
            )
          ) : users.length > 0 ? (
            users.map((user) => (
              <div
                key={user.id}
                className="p-4 hover:bg-gray-50 cursor-pointer">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <img
                      className="h-10 w-10 rounded-full"
                      src="https://via.placeholder.com/150"
                      alt="User Avatar"
                    />
                  </div>
                  <div className="ml-3">
                    <p className="text-sm font-medium text-gray-900">
                      {user.name}
                    </p>
                    <p className="text-sm text-gray-500">Last message...</p>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <li>No Contact added!</li>
          )}
        </div>

        <div className="p-4 border-t border-gray-200">
          <button className="w-full px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500">
            New Message
          </button>
        </div>
      </div>

      <div className="flex-1 p-8">
        <h1 className="text-2xl font-bold">Welcome to Messenger</h1>
        <p className="text-gray-600">Select a chat to start messaging.</p>
      </div>
    </div>
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
