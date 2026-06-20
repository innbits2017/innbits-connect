import ContactList from "@/components/ContactList";

export default async function ChatLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return (
    <div className="flex h-screen">
      <ContactList activeContactId={id} />

      <div className="flex-1">
        {children}
      </div>
    </div>
  );
}