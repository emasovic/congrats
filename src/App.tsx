import React from 'react';
import GameBoard from './GameBoard';

const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-orange-200 flex items-center justify-center">
      <GameBoard />
    </div>
  );
};

export default App;
