import React, { useEffect, useState } from "react";

const usersArray = [
  {
    message: [],
    author: {
      name: "Sikocak",
    },
  },
  {
    message: [],
    author: {
      name: "SukunDev",
    },
  },
  {
    message: [],
    author: {
      name: "PakdeKun",
    },
  },
  {
    message: [],
    author: {
      name: "danu_142",
    },
  },
  {
    message: [],
    author: {
      name: "roni_BDR",
    },
  },
  {
    message: [],
    author: {
      name: "sahabat_bapak",
    },
  },
  {
    message: [],
    author: {
      name: "otong_maho",
    },
  },
];

const messageArray = [
  "Hai",
  "selamat datang",
  "apa kabar!",
  "bagaimana keadaan mu",
  "Apa yang baru?",
  "Semoga hari Anda menyenangkan!",
  "Jangan lupa tersenyum!",
  "Ada yang bisa saya bantu?",
  "Hati-hati di jalan!",
  "Salam kenal!",
  "Terima kasih atas kunjungannya!",
  "Sudah makan belum?",
  "Jangan lupa istirahat!",
  "Semangat!",
  "Selamat datang kembali!",
  "Apa rencana Anda hari ini?",
  "Mari kita bahas lebih lanjut!",
  "Saya senang bisa bertemu Anda!",
  "Ada kabar gembira?",
  "Bagaimana cuaca di sana?",
  "Apakah Anda suka musik?",
];

function useLiveCharacterPreview() {
  const [users, setUsers] = useState(usersArray);

  useEffect(() => {
    const randomMessage = () => {
      const randomUserIndex = Math.floor(Math.random() * users.length);
      const randomMessageIndex = Math.floor(
        Math.random() * messageArray.length
      );

      const usersCopy = [...users];
      usersCopy[randomUserIndex].message = [
        {
          text: messageArray[randomMessageIndex],
        },
      ];

      setUsers(usersCopy);
    };

    const interval = setInterval(randomMessage, 5000);
    return () => clearInterval(interval);
  }, [users]);

  return { users };
}

export default useLiveCharacterPreview;
