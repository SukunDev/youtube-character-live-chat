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
      <div className="absolute inset-x-0 bottom-0 mx-auto text-white w-fit text-nowrap">
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
        <div className="absolute inset-x-0 mx-auto bottom-7 w-fit">
          <div className="bg-white rounded-xl px-2 py-0.5 max-w-64 min-w-32 text-xs line-clamp-2 text-center text-black">
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
          <div className="absolute inset-x-0 mx-auto -bottom-2 w-0 h-0 border-l-[7px] border-l-transparent border-t-[9px] border-t-white border-r-[7px] border-r-transparent"></div>
        </div>
      ) : (
        ""
      )}
    </div>
  );
}
