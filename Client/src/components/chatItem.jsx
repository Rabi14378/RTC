import zoroAvatar from "../assets/images/zoro11.jpg";
export default function ChatItem({ user, onClick, isSelected, searched }) {
  return (
    <div
      className={`p-4 hover:bg-gray-50 cursor-pointer ${
        isSelected && "bg-blue-50"
      }`}
      onClick={onClick}>
      <div className="flex items-center">
        <div className="flex-shrink-0">
          <img
            className="h-10 w-10 rounded-full"
            src={zoroAvatar}
            alt="User Avatar"
          />
        </div>
        <div className="ml-3">
          <p className="text-sm font-medium text-gray-900">{user.name}</p>
          {!searched && (
            <p className="text-sm text-gray-500">Last message...</p>
          )}
        </div>
      </div>
    </div>
  );
}
