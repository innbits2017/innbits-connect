"use client";

import Link from "next/link";
import { useState } from "react";

export default function ContactListClient({
  contacts,
  activeContactId,
}: {
  contacts: any[];
  activeContactId?: string;
}) {
  const [search, setSearch] = useState("");

  const filteredContacts = contacts.filter(
    (contact) =>
      (contact.name || "")
        .toLowerCase()
        .includes(search.toLowerCase()) ||
      contact.phone.includes(search)
  );

  return (
    <div className="w-80 border-r bg-white h-screen overflow-y-auto">
      <div className="p-4 border-b sticky top-0 bg-white z-10">
        <h2 className="font-bold text-xl mb-3">
          Chats
        </h2>

        <input
          type="text"
          placeholder="Search contacts..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full border rounded-lg p-2"
        />
      </div>

      {filteredContacts.map((contact) => {
        const lastMessage = contact.messages?.[0];

        return (
          <Link
            key={contact.id}
            href={`/chat/${contact.id}`}
            className={`block p-4 border-b transition-colors ${
              activeContactId === contact.id
                ? "bg-green-100 border-l-4 border-green-600"
                : "hover:bg-gray-100"
            }`}
          >
            <div className="flex justify-between">
              <div className="font-semibold">
                {contact.name || contact.phone}
              </div>

              {lastMessage && (
                <div className="text-xs text-gray-500">
                  {new Date(
                    lastMessage.createdAt
                  ).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </div>
              )}
            </div>

            <div className="text-sm text-gray-500 truncate">
              {lastMessage?.body || "No messages"}
            </div>
          </Link>
        );
      })}
    </div>
  );
}