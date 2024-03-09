"use client";

import useCharacter from "@/hooks/useCharacter";
import React from "react";

export default function Character({ user }) {
  const { characterRef, isMove, message, direction, imageName } =
    useCharacter(user);
  return (
    <div
      className="absolute bottom-16"
      style={{ left: -200, width: 256 }}
      ref={characterRef}
    >
      <img
        className="absolute inset-x-0 mx-auto"
        src={`/character/${imageName}_${isMove ? "move" : "idle"}.gif`}
        style={{
          transform: direction < 0 ? "scaleX(-1)" : "scaleX(1)",
          height: 72,
        }}
        alt={user.author.name}
      />
      <div className="absolute inset-x-0 bottom-0 mx-auto text-xs text-white w-fit text-nowrap font-pixeloid-bold">
        <p>
          {user.author.name}{" "}
          {user.isMembership ? (
            <img
              className="inline object-contain h-4"
              src={user.author.badge.thumbnail.url}
              alt={user.author.badge.thumbnail.alt}
            />
          ) : (
            ""
          )}
        </p>
      </div>
      {message.length > 0 ? (
        <div className="absolute inset-x-0 mx-auto bottom-1 w-fit">
          <div className="text-xs bubble medium bottom font-pixeloid-bold line-clamp-2">
            <p>
              {message.map((item, idx) =>
                item.text ? (
                  item.text
                ) : (
                  <img
                    className="inline object-contain h-4"
                    key={idx}
                    src={item.url}
                    alt={item.alt}
                  ></img>
                )
              )}
            </p>
          </div>
        </div>
      ) : (
        ""
      )}
    </div>
  );
}
