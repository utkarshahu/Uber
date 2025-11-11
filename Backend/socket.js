const socketIo = require("socket.io");
const userModel = require("./models/user.model");
const captainModel = require("./models/captain.model");

let io;

function initializeSocket(server) {
  io = socketIo(server, {
    cors: {
      origin: ["http://localhost:5173"], // React dev URL
      methods: ["GET", "POST"],
      credentials: true
    }
  });

  io.on("connection", (socket) => {
    console.log(`🟢 New client connected: ${socket.id}`);

  socket.on("join", async (data) => {
  const { userId, userType } = data;
  console.log(`📩 Join event: userId=${userId}, type=${userType}`);

  if (userType === "user") {
    await userModel.findByIdAndUpdate(userId, { socketId: socket.id });
    console.log(`✅ User ${userId} joined with socketId: ${socket.id}`);
    socket.emit("joined", { userType, userId, socketId: socket.id }); // ✅ Confirmation
  } else if (userType === "captain") {
    await captainModel.findByIdAndUpdate(userId, { socketId: socket.id });
    console.log(`✅ Captain ${userId} joined with socketId: ${socket.id}`);
    socket.emit("joined", { userType, userId, socketId: socket.id }); // ✅ Confirmation
  }
});






    // ✅ Update captain location
    socket.on("update-location-captain", async (data) => {
      try {
        const { userId, location } = data;

        if (!location || !location.ltd || !location.lng) {
          console.log("⚠️ Invalid location data received:", data);
          return socket.emit("error", { message: "Invalid location data" });
        }

        console.log(`📍 Updating captain ${userId} ->`, location);

        const updatedCaptain = await captainModel.findByIdAndUpdate(
          userId,
          {
            location: {
              type: "Point",
              coordinates: [
                parseFloat(location.lng),
                parseFloat(location.ltd)
              ]
            },
            socketId: socket.id,
            status: "active"
          },
          { new: true }
        );

        if (!updatedCaptain) {
          console.log("❌ Captain not found:", userId);
          return socket.emit("error", { message: "Captain not found" });
        }

        console.log("✅ Location updated successfully");
        socket.emit("location-updated", {
          success: true,
          location: updatedCaptain.location
        });
      } catch (error) {
        console.error("❌ Error updating location:", error);
        socket.emit("error", { message: "Failed to update location" });
      }
    });

    // ✅ Handle disconnection
    socket.on("disconnect", () => {
      console.log(`🔴 Client disconnected: ${socket.id}`);
    });
  });

  return io;
}

function sendMessageToSocketId(socketId, messageObject) {
  if (!io) {
    console.error("⚠️ Socket.IO not initialized yet!");
    return false;
  }

  if (!socketId) {
    console.error("⚠️ socketId is missing!");
    return false;
  }

  if (!messageObject?.event) {
    console.error("⚠️ messageObject.event is required!");
    return false;
  }

  const { event, data } = messageObject;
  try {
    io.to(socketId).emit(event, data);
    console.log(`📤 Sent '${event}' to ${socketId}`);
    return true;
  } catch (error) {
    console.error(`❌ Error sending message:`, error);
    return false;
  }
}

module.exports = { initializeSocket, sendMessageToSocketId };
