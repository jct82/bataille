'use client'
import { useState } from 'react';
import  Player from '@/components/Player'
import { dealedGame, getPlayers, compareCards, checkVictory, updatePlayers } from "./utils/calculs";

export default function Home() {
  let [players, setPlayers] = useState<Array<string[]>>(dealedGame());
  let [stack, setStack] = useState<string[]>([]);
  let outCome = '';

  /**
   * Compare players cards then update their games, the stack and eventually
   * @returns nothing
   */
  const layCards = () => {
    const {p1, p2, c1, c2} = getPlayers(players);
    const newStack: string[] = [...stack, p1[0], p2[0]];
    const result: string = compareCards(c1, c2);
    outCome = checkVictory(p1, p2, result);
    if (outCome.length > 0) return;
    if (result === '0') {
      setStack(newStack);
    } else {
      result === '1' ? p1.push(...newStack) : p2.push(...newStack);
      if (stack.length > 0) setStack([]);
    }
    setPlayers(updatePlayers(p1, p2));
  }

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <div className="game">
          <Player playerClass="player1" player={players[0]}></Player>
          <Player playerClass="player2" player={players[1]}></Player>
          <button className="cards-button" type="button" onClick={layCards}>next</button>
          {outCome.length > 0 &&
            <div className="outcome">
            <div>GAME OVER</div>
            <div>{`${outCome} WON`}</div>
          </div>}
        </div>
      </main>
    </div>
  );
}
