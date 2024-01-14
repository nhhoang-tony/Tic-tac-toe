function Board({ onSelectSquare, board }) {
  return (
    <div className='flex flex-wrap flex-col justify-center gap-2 xxs:gap-8 my-4 xxs:my-8 xs:my-12 mx-0 p-0 '>
      {board.map((row, rowIndex) => (
        <div key={rowIndex}>
          <div className='flex flex-wrap justify-center gap-2 xxs:gap-8 m-0 p-0'>
            {row.map((playerSymbol, colIndex) => (
              <div
                key={colIndex}
                className='w-20 h-20 xxs:w-24 xxs:h-24 xs:w-32 xs:h-32 border-none bg-[#a49e79] text-[#0d1706] text-[2.6rem] xxs:text-[3.4rem] xs:text-[5rem] text-center cursor-pointer font-[fantasy] p-4'
                onClick={() => onSelectSquare(rowIndex, colIndex)}
                disabled={playerSymbol !== null}
              >
                {playerSymbol}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export default Board;
