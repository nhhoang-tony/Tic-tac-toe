import { useState } from 'react';

export default function Player({
  initialName,
  symbol,
  currentTurn,
  onChangeName,
}) {
  const [playerName, setPlayerName] = useState(initialName);
  const [isEditing, setIsEditing] = useState(false);

  // player saves name
  function handleEdit() {
    setIsEditing((editing) => !editing);
    if (isEditing) {
      onChangeName(symbol, playerName);
    }
  }

  // player typing name
  function handleNameChange(event) {
    setPlayerName(event.target.value);
  }

  return (
    <div
      className={`flex items-center w-[250px] ${
        currentTurn
          ? 'border-solid border-[2px] border-[#f9e96e]'
          : 'border-solid border-[2px] border-transparent'
      }`}
    >
      <span className='border-solid border-[2px] border-transparent p-2 rounded font-bold'>
        {isEditing && (
          <input
            className='text-base w-32 border-none p-2 bg-[#0d1706] text-center'
            type='text'
            value={playerName}
            onChange={handleNameChange}
            autoFocus
            required
          ></input>
        )}
        {!isEditing && (
          <span className='inline-block w-32 text-base text-white m-0 p-2 rounded text-center text-ellipsis'>
            {playerName}
          </span>
        )}
        <span className='ml-4 text-base text-white font-[fantasy]'>
          {symbol}
        </span>
      </span>
      <button
        className='w-12 border-none bg-none text-[#f1a065fa] text-base cursor-pointer p-1 text-center transition-colors ease duration-200 hover:text-[#e89541de]'
        onClick={handleEdit}
        disabled={!playerName}
      >
        {isEditing ? 'Save' : 'Edit'}
      </button>
    </div>
  );
}
