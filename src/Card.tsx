import React from "react";
import { CardType } from "./types";
import cardBackground from "./assets/card-background.png";

interface CardProps {
  card: CardType;
  onClick: (key: number) => void;
  disabled: boolean;
}

const Card: React.FC<CardProps> = ({ card, onClick, disabled }) => {
  return (
    <div
      className={`relative w-20 h-28 perspective cursor-pointer ${
        disabled ? "cursor-not-allowed" : ""
      }`}
      onClick={() => !disabled && onClick(card.key)}
    >
      <div
        className={`absolute w-full h-full transition-transform duration-500 transform-style-preserve-3d ${
          card.flipped ? "rotate-y-180" : ""
        }`}
      >
        <div className="absolute w-full h-full bg-gray-300 backface-hidden flex items-center justify-center">
          <img
            src={cardBackground}
            alt="card back"
            className="w-full h-full object-cover"
          />
        </div>

        <div className="absolute w-full h-full backface-hidden transform rotate-y-180 flex items-center justify-center border-4 border-gold rounded-lg shadow-md">
        <div className="w-full h-full p-2 rounded-md border bg-gray-300 border-gray-300 shadow-inner flex items-center justify-center">
          <img
            src={card.image}
            alt="card front"
            className="w-full h-full object-cover"
          />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
