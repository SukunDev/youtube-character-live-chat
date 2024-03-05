"use client";

import React from "react";
import Character from "./character";
import useLiveCharacterPreview from "@/hooks/useLiveCharacterPreview";

export default function LiveCharacterPreview() {
  const { users } = useLiveCharacterPreview();
  return (
    <>
      {users.map((user, idx) => (
        <Character key={idx} user={user} />
      ))}
    </>
  );
}
