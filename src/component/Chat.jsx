import { useEffect, useState, useRef } from "react";
import { useParams } from "react-router";
import { createSocketConnection } from "../utils/socket";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { BASE_URL } from "../utils/constant";
import { addConnections } from "../utils/connectionSlice";

const Chat = () => {
  const { targetUserId } = useParams();
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [targetUser, setTargetUser] = useState(null);
  const [isOnline, setIsOnline] = useState(false);
  const messagesEndRef = useRef(null);

  const user = useSelector((store) => store.user);
  const userId = user?._id;

  const connections = useSelector((store) => store.connection);

  const dispatch = useDispatch();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const fetchChatMessages = async () => {
    try {
      const chat = await axios.get(BASE_URL + "/chat/" + targetUserId, {
        withCredentials: true,
      });

      const chatMessages = chat?.data?.data?.messages.map((msg) => {
        return {
          firstName: msg?.senderId?.firstName,
          lastName: msg?.senderId?.lastName || "",
          photoUrl: msg?.senderId?.photoUrl,
          text: msg?.text,
          createdAt: msg?.createdAt,
        };
      });

      setMessages(chatMessages);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchChatMessages();
  }, []);

  const fetchTargetUser = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/connections", {
        withCredentials: true,
      });

      dispatch(addConnections(res?.data?.data));

      const foundUser = res?.data?.data.find((c) => c._id === targetUserId);
      setTargetUser(foundUser);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (!userId) return;

    if (connections) {
      const foundUser = connections.find((c) => c._id === targetUserId);
      setTargetUser(foundUser);
    } else {
      fetchTargetUser();
    }

    const socket = createSocketConnection();
    socket.emit("joinChat", {
      firstName: user?.firstName,
      targetUserId,
      userId,
    });

    socket.on("messageReceived", ({ firstName, lastName, text }) => {
      setMessages((prev) => [
        ...prev,
        { firstName, lastName, text, createdAt: new Date().toISOString() },
      ]);
    });

    // socket.on("userOnline", ({ userId: onlineUserId }) => {
    //   if (onlineUserId === targetUserId) {
    //     setIsOnline(true);
    //   }
    // });

    // socket.on("userOffline", ({ userId: offlineUserId }) => {
    //   if (offlineUserId === targetUserId) {
    //     setIsOnline(false);
    //   }
    // });

    return () => {
      socket.disconnect();
    };
  }, [userId, targetUserId, connections]);

  const handleSendMessage = () => {
    if (!newMessage.trim()) return;

    const socket = createSocketConnection();

    socket.emit("sendMessage", {
      firstName: user.firstName,
      lastName: user.lastName,
      userId,
      targetUserId,
      text: newMessage,
    });
    setNewMessage("");
  };

  //   const formatTime = (dateString) => {
  //     if (!dateString) return "";
  //     const date = new Date(dateString);
  //     return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  //   };

  return (
    <div className="flex flex-col h-[calc(100vh-140px)] max-w-5xl mx-auto w-full bg-base-100 rounded-xl shadow-xl overflow-hidden border border-base-300">
      <div className="bg-gradient-to-r from-primary/20 via-base-100 to-secondary/20 border-b border-base-300 px-6 py-4 flex items-center gap-4">
        <div className={`avatar ${isOnline ? "online" : "offline"}`}>
          <div className="w-14 h-14 rounded-full ring ring-primary/20 ring-offset-base-100 ring-offset-2">
            <img
              src={targetUser?.photoUrl}
              alt={targetUser?.firstName}
              className="w-full h-full object-cover"
            />
          </div>
        </div>
        <div className="flex-1">
          <h2 className="font-bold text-xl">
            {targetUser?.firstName} {targetUser?.lastName}
          </h2>
          <div className="flex items-center gap-2">
            {/* {isOnline ? (
              <>
                <span className="w-2 h-2 rounded-full bg-success animate-pulse"></span>
                <p className="text-sm text-success">Online</p>
              </>
            ) : (
              <>
                <span className="w-2 h-2 rounded-full bg-base-content/30"></span>
                <p className="text-sm text-base-content/50">Offline</p>
              </>
            )} */}
          </div>
        </div>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-6 space-y-3 bg-base-200/70">
        {messages.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-center">
            <div className="w-24 h-24 rounded-full bg-gradient-to-br from-primary/20 via-secondary/10 to-accent/20 flex items-center justify-center mb-4 shadow-lg">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-12 w-12 text-primary"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                />
              </svg>
            </div>
            <h3 className="font-bold text-xl mb-2 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Start a conversation
            </h3>
            <p className="text-base-content/60 text-sm max-w-xs">
              Say hello to {targetUser?.firstName}! This is the beginning of
              your conversation.
            </p>
          </div>
        ) : (
          messages.map((msg, index) => {
            const isSender = msg.firstName === user?.firstName;
            return (
              <div
                key={index}
                className={`chat ${isSender ? "chat-end" : "chat-start"}`}
              >
                <div className="chat-image avatar placeholder">
                  <div className="w-10 h-10 rounded-full overflow-hidden">
                    <img
                      alt={isSender ? user?.firstName : targetUser?.firstName}
                      src={
                        isSender
                          ? user?.photoUrl
                          : targetUser?.photoUrl || "https://via.placeholder.com/96"
                      }
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
                <div className="chat-header text-xs text-base-content/50 mb-1 px-1">
                  {/* {`${msg.firstName} ${msg.lastName || ""}`} */}
                  {/* <time className="ml-2 opacity-70">
                    {formatTime(msg.createdAt)}
                  </time> */}
                </div>
                <div
                  className={`chat-bubble shadow-sm break-words whitespace-pre-wrap ${
                    isSender
                      ? "bg-gradient-to-r from-primary to-secondary text-primary-content border border-primary/30"
                      : "bg-base-100 text-base-content border border-base-300"
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            );
          })
        )}
        <div ref={messagesEndRef} />
      </div>


      <div className="bg-base-100 border-t border-base-300 p-4">
        <div className="flex gap-3 items-center">
          <div className="flex-1">
            <input
              type="text"
              placeholder="Type your message..."
              className="input input-bordered w-full focus:input-primary transition-all"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && newMessage.trim()) {
                  handleSendMessage();
                }
              }}
            />
          </div>
          <button
            className={`btn btn-circle ${
              newMessage.trim()
                ? "btn-primary shadow-lg shadow-primary/30"
                : "btn-disabled"
            } transition-all`}
            onClick={handleSendMessage}
            disabled={!newMessage.trim()}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M3.478 2.405a.75.75 0 00-.926.94l2.432 7.905H13.5a.75.75 0 010 1.5H4.984l-2.432 7.905a.75.75 0 00.926.94 60.519 60.519 0 0018.445-8.986.75.75 0 000-1.218A60.517 60.517 0 003.478 2.405z" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Chat;
