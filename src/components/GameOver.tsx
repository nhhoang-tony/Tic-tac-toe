import React from 'react';

export default function GameOver({ winner, onRestart }) {
  const restartButtonClasses =
    'block my-12 mx-auto text-2xl bg-none border-solid border-2 border-[#f9e96e] text-[#f9e96e] py-2 px-4 cursor-pointer transition-all ease duration-200 shadow-[0_0_8px_rgba(255,187,0,0.4)] hover:bg-[#f1a065fa] hover:text-[#0d1706] hover:scale-110 hover:shadow-[0_0_20px_rgba(255,187,0,0.8)]';
  return (
    <div className='absolute opacity-95 top-0 left-0 w-full h-full flex flex-col justify-center items-center bg-[#0d1706] animation'>
      <h2 className='font-[fantasy] text-7xl text-center text-[#f9e96e] m-0'>
        <img
          src='/static/img/game-over.svg'
          className='w-[28rem] m-0 p-8'
        ></img>
      </h2>
      {winner && (
        <p className='text-4xl text-center text-white'>{winner} has won!</p>
      )}
      {!winner && (
        <p className='text-4xl text-center text-white'>It's a draw</p>
      )}
      <p>
        <button className={restartButtonClasses} onClick={onRestart}>
          Rematch!
        </button>
      </p>
    </div>
  );
}
