"use client";

import Character from "@/components/character";
import { useThemeContext } from "@/components/provider";
import useStream from "@/hooks/useStream";

import React from "react";

export default function Live({ params }) {
  const { users } = useThemeContext();
  useStream({ params });

  return (
    <div className="flex flex-col min-h-screen overflow-hidden bg-black">
      <div className="relative flex flex-col h-screen">
        {users.map((user) => (
          <Character key={user.author.channelId} user={user} />
        ))}
      </div>
    </div>
  );
}
