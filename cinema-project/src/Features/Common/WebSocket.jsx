import { useEffect, useState } from "react";
import SockJS from "sockjs-client";
import { Client } from "@stomp/stompjs";

const useWebSocket = () => {
    const [stompClient, setStompClient] = useState(null);
    const [seatStatus, setSeatStatus] = useState([]);
    const token = localStorage.getItem("token");

    useEffect(() => {
        const socketUrl = "http://localhost:8080/api/user/ws";
        const client = new Client({
            webSocketFactory: () => new SockJS(socketUrl, null, { transports: ['websocket'] }), 
            reconnectDelay: 5000,
            debug: (str) => console.log(str),
            connectHeaders: {
                Authorization: `Bearer ${token}`,
            },
            onConnect: () => {
                console.log("✅ Connected to WebSocket");
                client.subscribe("/topic/seat-status", (message) => {
                    const updatedSeats = JSON.parse(message.body);
                    console.log(updatedSeats, "updatedSeats");
                    setSeatStatus(updatedSeats);
                });
            },
            onDisconnect: () => {
                console.log("❌ WebSocket Disconnected");
            }
        });

        client.activate(); // Kích hoạt WebSocket
        setStompClient(client); // Lưu client vào state

        return () => {
            if (client && client.connected) {
                console.log("🔴 Disconnecting WebSocket...");
                client.deactivate();
            }
        };
    }, []);

    return { seatStatus, stompClient };
};

export default useWebSocket;
