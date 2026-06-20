import { prisma } from "@/lib/prisma";
import MessageComposer from "@/components/MessageComposer";
import RealtimeMessages from "@/components/RealtimeMessages";

export default async function ChatPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const contact = await prisma.contact.findUnique({
    where: { id },
    include: {
      messages: {
        orderBy: {
          createdAt: "asc",
        },
      },
    },
  });

  if (!contact) {
    return <div>Contact not found</div>;
  }

return (
  <div className="p-6">
    <RealtimeMessages />
    <h1 className="text-2xl font-bold mb-6">
      {contact.name || contact.phone}
    </h1>

    <div className="space-y-3 mb-6">
      {contact.messages.map((msg) => (
        <div
          key={msg.id}
          className={`p-3 rounded max-w-md ${
            msg.direction === "inbound"
              ? "bg-gray-200"
              : "bg-green-200 ml-auto"
          }`}
        >
          {msg.body}
        </div>
      ))}
    </div>

    <MessageComposer contactId={contact.id} />
  </div>
);
}