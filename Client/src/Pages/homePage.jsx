import ChatPanel from "@/components/chatPanel";
import SidePanel from "@/components/sidePanel";

export default function Home() {
  return (
    <div className="flex h-screen bg-gray-100">
      <SidePanel />
      <ChatPanel />
    </div>
  );
}
