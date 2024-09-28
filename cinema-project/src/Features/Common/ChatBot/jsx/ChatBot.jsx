import React, { useState } from "react";
import "../Content/ChatBot.css";
import { FaPaperPlane } from "react-icons/fa"; // Sử dụng icon gửi từ react-icons
import { close, logodefault } from "../../../../images/icon";

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState("");

  const handleToggleChat = () => {
    setIsOpen((prevState) => !prevState);
  };

  const handleSendMessage = () => {
    if (inputMessage.trim()) {
      setMessages((prevMessages) => [
        ...prevMessages,
        { text: inputMessage, user: true },
      ]);
      setInputMessage("");
      sendMessageToChatbot(inputMessage);
    }
  };

  const sendMessageToChatbot = async (message) => {
    try {
      const response = await fetch("/api/chatbot", {
        method: "POST",
        body: JSON.stringify({ message }),
        headers: { "Content-Type": "application/json" },
      });
      const data = await response.json();
      setMessages((prevMessages) => [
        ...prevMessages,
        { text: data.response, user: false },
      ]);
    } catch (error) {
      console.error("Error sending message to chatbot:", error);
    }
  };

  return (
    <div className="chatbot-container">
      {!isOpen && (
        <div onClick={handleToggleChat} className="chat-toggle-icon">
          <img width="35" height="35" src={String(logodefault)} alt="img" />
        </div>
      )}

      {isOpen && (
        <div className="chat-window">
          <div className="chat-close-icon" onClick={handleToggleChat}>
            <img width="14" height="14" src={String(close)} alt="img" />
          </div>
          <div className="chat-header">
            <img width="30" height="30" src={String(logodefault)} alt="img" />
          </div>
          <div className="chat-body">
            <div className="chat-messages">
              {messages.map((msg, index) => (
                <div
                  key={index}
                  className={msg.user ? "user-message" : "bot-message"}
                >
                  {msg.text}
                </div>
              ))}
            </div>
          </div>
          <div className="chat-input">
            <input
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
              placeholder="Nhập tin nhắn..."
            />
            <button onClick={handleSendMessage} className="send-button">
              <FaPaperPlane size={20} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatBot;
