"use client";

import { useEffect } from "react";
import { supabase } from "@/lib/supabase";

export default function RealtimeMessages() {
  useEffect(() => {
    const channel = supabase
      .channel("messages")
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "Message",
        },
        (payload) => {
          console.log("New Message:", payload);
          window.location.reload();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  return null;
}