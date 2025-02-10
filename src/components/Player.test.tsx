import {describe, expect, test} from '@jest/globals';
import {cleanup, fireEvent, getByRole, render, screen} from '@testing-library/react';
import { dealedGame } from '@/app/utils/calculs';
import Home from '@/app/page';
import Player from './Player';

describe('Player component', () => {
	const players: Array<string[]> = dealedGame();
	const {getByRole, asFragment} = render(<Home />);
	const firstRender = asFragment()

	const btn = screen.getByRole('button');
	  fireEvent.click(btn);
console.log('AS FRAGMENT', firstRender);
	  expect(firstRender).toMatchSnapshot(asFragment());
	//   <Player playerClass="player" player={players[0]} />
	//   const btn = screen.getByRole('button');
	//   fireEvent.click(btn);
});