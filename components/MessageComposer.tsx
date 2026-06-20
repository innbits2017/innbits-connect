"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";


export default function MessageComposer({
  contactId,
}: {
  contactId: string;
}) {

  const router = useRouter();
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const sendMessage = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!message.trim()) return;

    setLoading(true);

    try {
      const response = await fetch("/api/send", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contactId,
          message,
        }),
      });

      const data = await response.json();

      if (data.success) {
        setMessage("");
        router.refresh();
      } else {
        alert("Failed to send message");
      }
    } catch (err) {
      console.error(err);
      alert("Error sending message");
    }

    setLoading(false);
  };

  return (
    <form onSubmit={sendMessage} className="flex gap-2 mt-6">
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Type message..."
        className="border p-2 flex-1 rounded"
      />

      <button
        type="submit"
        disabled={loading}
        className="bg-green-600 text-white px-4 py-2 rounded"
      >
        {loading ? "Sending..." : "Send"}
      </button>
    </form>
  );
}