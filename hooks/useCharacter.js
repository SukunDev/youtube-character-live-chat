import React, { useEffect, useRef, useState } from "react";

const arrayChooser = (array) => {
  if (array.length === 0) {
    return null;
  }
  const randomIndex = Math.floor(Math.random() * array.length);
  return array[randomIndex];
};

const characterImage = ["blue_dino", "yellow_dino", "red_dino", "green_dino"];

function useCharacter(user) {
  const characterRef = useRef(null);
  const speed = 3.5;
  const [distance, setDistance] = useState(null);
  const [direction, setDirection] = useState(1);
  const [isMove, setIsMove] = useState(false);
  const [message, setMessage] = useState([]);
  const [imageName, setImageName] = useState(arrayChooser(characterImage));

  useEffect(() => {
    if (window !== undefined) {
      const character = characterRef.current;
      let characterPosition = parseInt(character.style.left.replace("px", ""));
      let currentPos = 0;

      const moveCharacter = () => {
        if (currentPos <= distance) {
          currentPos += speed;
          characterPosition += speed * direction;
          character.style.left = characterPosition + "px";
          setIsMove(true);
          requestAnimationFrame(moveCharacter);
        } else {
          setIsMove(false);
        }
      };

      const characterMoveAnim = requestAnimationFrame(moveCharacter);

      return () => cancelAnimationFrame(characterMoveAnim);
    }
  }, [distance, direction]);

  useEffect(() => {
    if (window !== undefined) {
      const character = characterRef.current;
      let characterPosition = parseInt(character.style.left.replace("px", ""));
      const distance = Math.floor(Math.random() * window.innerWidth) + 100;
      if (Math.floor(characterPosition + distance) <= window.innerWidth) {
        setDistance(distance);
      }
    }
  }, []);

  useEffect(() => {
    const randomMove = () => {
      const character = characterRef.current;
      const characterPosition = parseFloat(character.style.left || 0);
      const windowWidth = window.innerWidth;
      const distance = Math.floor(Math.random() * windowWidth) + 1;
      const direction = Math.random() < 0.5 ? -1 : 1;
      if (direction < 0) {
        // kiri
        if (characterPosition + distance * direction >= 0) {
          setDistance(distance);
          setDirection(direction);
        }
      } else {
        // kanan
        if (characterPosition + distance * direction <= windowWidth) {
          setDistance(distance);
          setDirection(direction);
        }
      }
    };
    const interval = setInterval(
      randomMove,
      Math.floor(Math.random() * 8000) + 3000
    );

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    setMessage(user.message);
    const timeoutId = setTimeout(() => {
      setMessage([]);
    }, 4000);
    return () => clearTimeout(timeoutId);
  }, [user.message]);

  return {
    characterRef,
    direction,
    isMove,
    message,
    imageName,
  };
}

export default useCharacter;
