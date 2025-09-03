import { io } from "socket.io-client";
import { WS_URL } from "../config";

export const socket = io(WS_URL, {
    withCredentials: true
});

socket.on("connect", () => console.log("Connected to WS with ID:", socket.id));
socket.on("disconnect", () => console.log("Disconnected from WS"));