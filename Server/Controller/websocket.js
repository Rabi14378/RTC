import { Message } from "../Model/messageModel";
import { User } from "../Model/userModel";

export const webSocket = (io) => {
  const users = new Map();

  io.on("connection", (socket) => {
    console.log("A user connected:", socket.id);
    socket.on("user_connected", async (userId) => {
      users.set(userId, socket.id);
      const user = await User.findByIdAndUpdate(userId, {
        isOnline: true,
      }).select("_id name");
      io.emit("update_users", user);
    });

    socket.on("send_message", async (data) => {
      const { senderId, receiverId, content } = data;
      const message = new Message({ senderId, receiverId, content });
      await message.save();

      if (users.has(receiverId)) {
        io.to(users.get(receiverId)).emit("receive_message", message);
      }
    });

    socket.on("disconnect", async () => {
      console.log("user Disconnected", socket.id);
      for (const [userId, socketId] of users.entries()) {
        if (socketId === socket.id) {
          users.delete(userId);
          await User.findByIdAndUpdate(userId, { isOnline: false });
        }
      }
    });
  });
};
