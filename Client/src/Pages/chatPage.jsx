import ChatPanel from "@/components/chatPanel";
import SidePanel from "@/components/sidePanel";

export default function Home() {
  // todo: api call for conversation list here and pass to SidePanel

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
  return (
    <div className="flex h-screen bg-gray-100">
      <SidePanel />
      <ChatPanel />
    </div>
  );
}
