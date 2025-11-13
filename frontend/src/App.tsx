import { useEffect, useState, useRef } from "react";

function App() {
  const [messages, setMessages] = useState(["hiii" , "heloo"]); // Should be array, not string
  
  const wsRef = useRef(null); // Store WebSocket instance

  

  useEffect(() => {
    const ws = new WebSocket("ws://localhost:8080");
    wsRef.current = ws;

    ws.onopen = () => {
      console.log("WebSocket connected");
      ws.send(JSON.stringify({
        type: "join",
        payload: {
          roomId: "red"
        }
      }))
    };

    ws.onmessage = (ev) => {
      setMessages((m) => [...m, ev.data]);
    };

    ws.onerror = (error) => {
      console.error("WebSocket error:", error);
    };

    ws.onclose = () => {
      console.log("WebSocket disconnected");
    };

    // Cleanup on unmount
    return () => {
      ws.close();
    };
  }, []);

  return (
    <div className="h-screen bg-black">
      <div className="h-[85vh] overflow-y-auto p-4">
        {messages.map((message, index) => (
          <div key={index} className="mb-2">
            <span className="bg-white text-black rounded p-4 inline-block">
              {message}
            </span>
          </div>
        ))}
      </div>
      <div className="w-full bg-white flex">
        <input
          className="flex-1 p-4 outline-none"
          id="message"
          placeholder="Type a message..."
        />
        <button
          className="bg-purple-600 text-white p-4 hover:bg-purple-700"
          onClick={() => {
            const message = document.getElementById("message")?.value;
            wsRef.current.send(JSON.stringify({
              type: "chat",
              payload: {
                message: message
              }
          }))
          }}
        >
          Send
        </button>
      </div>
    </div>
  );
}

export default App;
