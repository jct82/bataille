import {describe, expect, test} from '@jest/globals';
import { dealedGame, cardGame, getCardVal, compareCards, checkVictory } from "./calculs";

  describe('Card game', () => {
	const stack = cardGame();
	const players = dealedGame()
	test('has to contain 52 cards', () => {
		expect(stack.length).toBe(52);
	});
	test(`Every card has to start with the letter h or s or d or t, 
	followed by a number between 0 and 12 included`, () => {
		stack.forEach(t => {
			expect(t).toMatch(/^[hsdt]([0-9]|1[012])$/);
		});
	});
	test(`Must not have duplicates`, () => {
		function checkIfDuplicateExists(arr: string[]) {
			return new Set(arr).size !== arr.length
		}
		expect(checkIfDuplicateExists(stack)).toBeFalsy();
	});
	test(`Has to be shuffled`, () => {
		function isOrdered(arr: string[]) {
			let ordered = true;
			['h', 's', 'd', 't'].every((color, i) => {
				for (let j = 0; j < 13; j++) {
					if (arr[(i * 12) + j] !== color + j) {
						ordered = false;
						break;
					}
				}
				return ordered;
			});
			return ordered;
		}
		expect(isOrdered(stack)).toBeFalsy();
	});
	test(`Has to be dealed in 2 equal stacks of 26 cards`, () => {
		expect(players[0].length === players[1].length && players[0].length === 26).toBeTruthy();
	});
  });

  describe('Card value', () => {
	test('Has to be of type number', () => {
		expect(typeof getCardVal('s8')).toBe('number');
	});
	test('Number cards value has to be equal to what they poster', () => {
		expect(getCardVal('s8')).toBe(8);
	});
	test(`Cards values are equal to the number contained in their name,
	except for aces which are the strongest cards (value = 13)`, () => {
		expect(getCardVal('s8') < getCardVal('h12')).toBeTruthy();
		expect(getCardVal('s12') < getCardVal('t0')).toBeTruthy();
		expect(getCardVal('d0')).toBe(13);
	});
  });

  describe('Comparing cards values', () => {
	test(`first value stronger than second returns 1,
	first value weaker than second returns 2,
	both values equal returns 3`, () => {
		expect(compareCards(5, 2)).toBe('1');
		expect(compareCards(2, 5)).toBe('2');
		expect(compareCards(2, 2)).toBe('0');
	});
  });

  describe('Game is over when checkVictory returns a string which is not empty', () => {
	test(`if a player has only one card left and has not won last round`, () => {
		expect(checkVictory(['s5'], ['d3', 'h8'], '1')).toBe('');
		expect(checkVictory(['s5'], ['d3', 'h8'], '2')).toBe('PLAYER 2');
		expect(checkVictory(['s5'], ['d3', 'h8'], '0')).toBe('PLAYER 2');
		expect(checkVictory(['s5', 't10'], ['d3', 'h8'], '2')).toBe('');
	});
  });