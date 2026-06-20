import { prisma } from "@/lib/prisma";
import Link from "next/link";

export default async function InboxPage() {
  const contacts = await prisma.contact.findMany({
    include: {
      messages: {
        orderBy: {
          createdAt: "desc",
        },
        take: 1,
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">
        WhatsApp Inbox
      </h1>

      {contacts.map((contact) => (
  <Link
    key={contact.id}
    href={`/chat/${contact.id}`}
    className="block border p-4 mb-3 rounded"
  >
    <div className="font-semibold">
      {contact.name || contact.phone}
    </div>

    <div className="text-gray-500">
      {contact.messages[0]?.body}
    </div>
  </Link>
))}

    </div>
  );
}