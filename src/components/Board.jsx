function Board({ onSelectSquare, board }) {
  return (
    <div className='flex flex-wrap flex-col justify-center gap-2 xxs:gap-8 my-4 xxs:my-8 xs:my-12 mx-0 p-0 '>
      {board.map((row, rowIndex) => (
        <div key={rowIndex}>
          <div className='flex flex-wrap justify-center gap-2 xxs:gap-8 m-0 p-0'>
            {row.map((playerSymbol, colIndex) => (
              <div
                key={colIndex}
                className='flex flex-col justify-center items-center w-20 h-20 xxs:w-24 xxs:h-24 xs:w-32 xs:h-32 border-none bg-[#a49e79] text-[#0d1706] text-[2.6rem] xxs:text-[3.4rem] xs:text-[5rem] text-center cursor-pointer font-[fantasy] p-4'
                onClick={() => onSelectSquare(rowIndex, colIndex)}
                disabled={playerSymbol !== null}
              >
                <img
                  src='/static/img/o-black.svg'
                  className={`${
                    playerSymbol === 'O' ? 'visible' : 'hidden'
                  } w-3/4 h-3/4 object-contain`}
                ></img>
                <img
                  src='/static/img/x-black.svg'
                  className={`${
                    playerSymbol === 'X' ? 'visible' : 'hidden'
                  } w-3/4 h-3/4 object-contain`}
                ></img>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export default Board;
