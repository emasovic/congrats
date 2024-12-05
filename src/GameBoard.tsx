import React, { useState } from "react";
import Card from "./Card";
import CardOverlay from "./CardOverlay";
import { CardType } from "./types";
import mimaPng from "./assets/mima.png";
import mimaGif from "./assets/mima.gif";
import mimaVoice from "./assets/mima.m4a";
import vanjaPng from "./assets/vanja.png";
import vanjaGif from "./assets/vanja.gif";
import vanjaVoice from "./assets/vanja.m4a";
import ekoPng from "./assets/eko.png";
import ekoGif from "./assets/eko.gif";
import ekoVoice from "./assets/eko.m4a";
import emdziPng from "./assets/emdzi.png";
import emdziGif from "./assets/emdzi.gif";
import emdziVoice from "./assets/emdzi.m4a";

const GameBoard: React.FC = () => {
  const [cards, setCards] = useState<CardType[]>(shuffleCards(initialCards()));
  const [flippedCards, setFlippedCards] = useState<CardType[]>([]);
  const [matchedCards, setMatchedCards] = useState<number[]>([]);
  const [playingCard, setPlayingCard] = useState<CardType | null>(null);
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [gameComplete, setGameComplete] = useState<boolean>(false);

  const isGameDone = matchedCards.length === cards.length;

  function initialCards(): CardType[] {
    const pairs: CardType[] = [
      {
        id: 1,
        image: mimaPng,
        audio: mimaVoice,
        gif: mimaGif,
        flipped: false,
        key: 0,
      },
      {
        id: 2,
        image: vanjaPng,
        audio: vanjaVoice,
        gif: vanjaGif,
        flipped: false,
        key: 1,
      },
      {
        id: 3,
        image: emdziPng,
        audio: emdziVoice,
        gif: emdziGif,
        flipped: false,
        key: 2,
      },
      {
        id: 4,
        image: ekoPng,
        audio: ekoVoice,
        gif: ekoGif,
        flipped: false,
        key: 3,
      },
      // Add more pairs here
    ];
    return pairs
      .concat(pairs)
      .map((card, index) => ({ ...card, key: index, flipped: false }));
  }

  function shuffleCards(cards: CardType[]): CardType[] {
    return cards.sort(() => Math.random() - 0.5);
  }

  const handleCardClick = (key: number): void => {
    if (
      isProcessing ||
      flippedCards.length === 2 ||
      matchedCards.includes(key)
    ) {
      return;
    }

    const updatedCards = cards.map((card) =>
      card.key === key ? { ...card, flipped: true } : card
    );
    setCards(updatedCards);

    const newFlippedCards = [
      ...flippedCards,
      updatedCards.find((card) => card.key === key)!,
    ];
    setFlippedCards(newFlippedCards);

    if (newFlippedCards.length === 2) {
      setIsProcessing(true);
      const [card1, card2] = newFlippedCards;

      if (card1.id === card2.id) {
        setMatchedCards([...matchedCards, card1.key, card2.key]);
        setPlayingCard(card1);

        setFlippedCards([]);
        setIsProcessing(false);
      } else {
        setTimeout(() => {
          setCards((prevCards) =>
            prevCards.map((card) =>
              newFlippedCards.includes(card)
                ? { ...card, flipped: false }
                : card
            )
          );
          setFlippedCards([]);
          setIsProcessing(false);
        }, 1000);
      }
    }
  };

  const restartGame = (): void => {
    setCards(shuffleCards(initialCards()));
    setFlippedCards([]);
    setMatchedCards([]);
    setPlayingCard(null);
    setIsProcessing(false);
    setGameComplete(false);
  };

  return (
    <div className="p-4">
      <div className="grid grid-cols-4 gap-4">
        {cards.map((card) => (
          <Card
            key={card.key}
            card={card}
            onClick={handleCardClick}
            disabled={
              isProcessing || card.flipped || matchedCards.includes(card.key)
            }
          />
        ))}
      </div>
      {playingCard && (
        <CardOverlay
          card={playingCard}
          onClose={() => setPlayingCard(null)}
          isGameDone={isGameDone}
          onGameDone={() => setGameComplete(true)}
        />
      )}
      {gameComplete && (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-75 flex items-center p-4 justify-center z-50">
          <div className="bg-white p-6 rounded-lg text-center shadow-lg max-w-xl">
            <h2 className="text-3xl font-bold mb-4 text-gray-800">
              Čestitamo na vašoj Zlatnoj svadbi! 💛
            </h2>
            <p className="text-gray-600 mb-6 text-lg">
              Pedeset godina ljubavi, strpljenja i zajedničkih uspomena je
              zaista nešto posebno! Neka vas i naredni trenuci ispunjavaju
              radošću i srećom.
            </p>
            <button
              onClick={restartGame}
              className="px-4 py-2 bg-blue-500 text-white rounded-lg shadow hover:bg-blue-600 transition"
            >
              Restartuj igru
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default GameBoard;
