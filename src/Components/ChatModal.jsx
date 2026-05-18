import { useEffect, useState } from "react";

const ChatModal = ({ donor, CurrentUser, closeModal }) => {

  const [messages, setMessages] = useState([]);
  const [text, setText] = useState("");
  console.log(donor,CurrentUser)

  const conversationId = `${CurrentUser._id}-${donor._id}`;
  console.log(conversationId)

  // fetch messages every 3 seconds
  useEffect(() => {

    const fetchMessages = async () => {

      const res = await fetch(
        `http://localhost:5000/messages/?conversationId=${conversationId}`
      );

      const data = await res.json();
      setMessages(data);
    };

    fetchMessages();

    const interval = setInterval(() => {
      fetchMessages();
    }, 3000);

    return () => clearInterval(interval);

  }, [conversationId]);


  // send message
  const handleSendMessage = async () => {

    if (!text.trim()) return;

    const messageData = {
      conversationId,
      senderId: CurrentUser._id,
      receiverId: donor._id,
      text,
    };

    const res = await fetch("http://localhost:5000/messages", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(messageData),
    });
      
     if(res.ok){
        console.log(res)
      const data = await res.json();
      setMessages([...messages, data]);
        setText("");
     }

    // if (data.insertedId) {
    
    // }
  };



  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">

      <div className="bg-white w-[400px] rounded-2xl p-5">

        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">
            Chat with {donor.name}
          </h2>

          <button onClick={closeModal}>
            ✖
          </button>
        </div>


        {/* messages */}
        <div className="h-[300px] overflow-y-auto border rounded-xl p-3 space-y-3">

          {
            messages.map((message,i) => (
              <div
                key={i}
                className={`p-2 rounded-xl w-fit max-w-[80%] ${
                  message.senderId === CurrentUser._id
                    ? "ml-auto bg-red-500 text-white"
                    : "bg-gray-200"
                }`}
              >
                {message.text}
              </div>
            ))
          }

        </div>


        {/* input */}
        <div className="flex gap-2 mt-4">

          <input
            type="text"
            placeholder="Type message..."
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="border w-full rounded-xl px-3"
          />

          <button
            onClick={handleSendMessage}
            className="bg-red-600 text-white px-5 rounded-xl"
          >
            Send
          </button>

        </div>

      </div>

    </div>
  );
};

export default ChatModal;