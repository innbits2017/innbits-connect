import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;

  const mode = searchParams.get("hub.mode");
  const token = searchParams.get("hub.verify_token");
  const challenge = searchParams.get("hub.challenge");

  if (
    mode === "subscribe" &&
    token === process.env.WHATSAPP_VERIFY_TOKEN
  ) {
    return new Response(challenge, { status: 200 });
  }

  return new Response("Forbidden", { status: 403 });
}

export async function POST(req: NextRequest) {
  const body = await req.json();

  try {
    const value = body?.entry?.[0]?.changes?.[0]?.value;

    const message = value?.messages?.[0];

    if (message) {
      const phone = message.from;
      const text = message.text?.body || "";

      const profileName =
        value?.contacts?.[0]?.profile?.name || null;

      let contact = await prisma.contact.findUnique({
        where: {
          phone,
        },
      });

      if (!contact) {
        contact = await prisma.contact.create({
          data: {
            phone,
            name: profileName,
          },
        });
      } else if (!contact.name && profileName) {
        contact = await prisma.contact.update({
          where: {
            phone,
          },
          data: {
            name: profileName,
          },
        });
      }

      await prisma.message.create({
        data: {
          body: text,
          direction: "inbound",
          contactId: contact.id,
        },
      });
    }

    return NextResponse.json({
      success: true,
    });
  } catch (err) {
    console.error(err);

    return NextResponse.json({
      success: false,
    });
  }
}