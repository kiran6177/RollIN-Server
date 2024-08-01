import { Server } from "socket.io";
import { UserUnreadGet, UserUpdateNotifications } from "./usecases/index.js";
import dependencies from "./frameworks/dependencies.js";
const usersWithSocketId = new Map();
let io;

export const connectSocket = (http) => {
  try {
    io = new Server(http, {
      cors: {
        origin: ["http://localhost:4000", "http://localhost:3000"],
      },
    });
    console.log("SOCKET");
    io.on("connection", (socket) => {
      console.log("SOCKET CONNENCTED");

      //CONNECT_USER
      socket.on("connect-user", async (user_id) => {
        usersWithSocketId.set(user_id, socket?.id);
        console.log("USER_SOCKET_MAP", usersWithSocketId);

        //CHECKING_FOR_UNREAD_NOTIFICATIONS
        const getUnreadUseCase = new UserUnreadGet(dependencies);
        const notificationList = await getUnreadUseCase.execute(user_id);
        console.log(notificationList);

        //EMITTING_EVENT_IF_UNREAD_NOTIFICATIONS_EXIST
        if (notificationList?.length > 0) {
          socket.emit("has-unread-notifications", notificationList);
        }
      });

      //REMOVE_USER
      socket.on("remove-user", (user_id) => {
        if (usersWithSocketId.has(user_id)) {
          usersWithSocketId.delete(user_id);
        }
        console.log("USER_SOCKET_MAP", usersWithSocketId);
      });

      //NOTIFICATION_STATUS_UPDATE_TO_READ
      socket.on('read-notifications',async (unreadIds)=>{
        if(unreadIds?.length > 0){
          const updateNotificationStatusUseCase = new UserUpdateNotifications(dependencies);
          for(let unread of unreadIds){
            await updateNotificationStatusUseCase.execute(unread)
          }
          console.log("UPDATED");
          socket.emit("has-unread-notifications", []);
        }
      })

      socket.conn.on("close", (reason) => {
        console.log("SOCKET CLOSED");
      });
    });
  } catch (error) {
    console.log(error);
  }
};

export const sendNotification = (notification, reciever_id) => {
  console.log("SEND-NOTI");
  io.to(usersWithSocketId.get(reciever_id)).emit('new-notifications',notification);
};
