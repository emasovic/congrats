import React, { useEffect } from 'react';
import { CardType } from './types';

interface CardOverlayProps {
  card: CardType;
  isGameDone: boolean
  onGameDone: () => void;
  onClose: () => void;
}

const CardOverlay: React.FC<CardOverlayProps> = ({ card, onClose, isGameDone, onGameDone }) => {
  useEffect(() => {
    const audioElement = new Audio(card.audio);
    audioElement.play();

    const handleAudioEnd = () => {
      if(isGameDone) {
        onGameDone()
      }
      onClose();
    };

    audioElement.addEventListener('ended', handleAudioEnd);
    return () => {
      audioElement.pause();
      audioElement.removeEventListener('ended', handleAudioEnd);
    };
  }, [card.audio, isGameDone, onClose, onGameDone]);

  return (
    <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="text-white text-lg max-w-xl"><img src={card.gif} /></div>
    </div>
  );
};

export default CardOverlay;
