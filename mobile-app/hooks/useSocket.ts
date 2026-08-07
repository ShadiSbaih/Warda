import { useEffect, useRef } from "react";
import { io, Socket } from "socket.io-client";
import { API_BASE_URL } from "../services/api";
import { authStorage } from "../services/authStorage";

const socketUrl = API_BASE_URL.split("/api")[0];

export function useSocket() {
  const socketRef = useRef<Socket | null>(null);

  useEffect(() => {
    let socket: Socket | null = null;

    const initSocket = async () => {
      const token = await authStorage.getToken();

      socket = io(socketUrl, {
        transports: ["websocket", "polling"],
        reconnection: true,
        timeout: 10000,
        auth: token ? { token } : undefined,
      });

      socketRef.current = socket;

      socket.on("connect", () => {
        console.log("Socket connected:", socket?.id);
      });

      socket.on("connect_error", (err) => {
        console.log("Socket connection error:", err.message);
      });
    };

    initSocket();

    return () => {
      socket?.disconnect();
      socketRef.current = null;
    };
  }, []);

  const joinOrder = (orderId: string) => {
    socketRef.current?.emit("joinOrder", orderId);
  };

  const on = (event: string, callback: (...args: any[]) => void) => {
    socketRef.current?.on(event, callback);
    return () => {
      socketRef.current?.off(event, callback);
    };
  };

  const emit = (event: string, data: any) => {
    socketRef.current?.emit(event, data);
  };

  return { socket: socketRef.current, joinOrder, on, emit };
}
