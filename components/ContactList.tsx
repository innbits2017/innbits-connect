import { prisma } from "@/lib/prisma";
import ContactListClient from "./ContactListClient";

export default async function ContactList({
  activeContactId,
}: {
  activeContactId?: string;
}) {
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
    <ContactListClient
      contacts={contacts}
      activeContactId={activeContactId}
    />
  );
}