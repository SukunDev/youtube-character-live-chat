"use client";

import { createContext, useContext, useEffect, useState } from "react";

const ThemeContext = createContext({});

export const ThemeContextProvider = ({ children }) => {
  const [users, setUsers] = useState([]);
  const [options, setOptions] = useState({
    totalMaxUser: 15,
    characterTime: 30,
  });

  const handleUsers = (data) => {
    setUsers((prevState) => {
      const existingUser = prevState.find(
        (user) => user.author.channelId === data.author.channelId
      );
      if (existingUser) {
        const updatedUsers = prevState.map((user) => {
          if (user.author.channelId === data.author.channelId) {
            return { ...user, message: data.message, createAt: Date.now() };
          } else {
            return user;
          }
        });
        return updatedUsers;
      } else if (prevState.length < options.totalMaxUser) {
        return [
          ...prevState,
          {
            author: data.author,
            message: data.message,
            isMembership: data.isMembership,
            isOwner: data.isOwner,
            isModerator: data.isModerator,
            isVerified: data.isVerified,
            superchat: data.superchat ? data.superchat : null,
            createAt: Date.now(),
          },
        ];
      } else {
        const updatedUsers = [...prevState];

        const indexToRemove = updatedUsers.findIndex(
          (user) =>
            Math.floor(Date.now() - user.createAt) >=
            Math.floor(options.characterTime * 1000)
        );

        if (indexToRemove !== -1) {
          updatedUsers.splice(indexToRemove, 1);
        }
        return updatedUsers;
      }
    });
  };

  return (
    <ThemeContext.Provider value={{ users, options, handleUsers }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useThemeContext = () => useContext(ThemeContext);
