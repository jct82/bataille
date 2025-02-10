/**
 * Split deck in two equal stacks for each players
 * @returns Array<string[]>
 */
export const dealedGame = () => {
	const game: string[] = cardGame();
	return [game.slice(0, game.length / 2), game.slice(game.length / 2)]
}

/**
 * Set deck of 52 cards (13 / colors)
 * @returns string[]
 */
export const cardGame = (): string[] => {
	const pile: string[] = [];
	const colors = ['h', 's', 'd', 't'];
	colors.forEach(c => {
		for (let i = 0; i < 13; i++) pile.push(`${c}${i}`);
	});
	return shuffle(pile);
}

/**
 * Shuffle cards
 * @param pile card deck
 * @returns shuffled card deck
 */
export const shuffle = (pile: string[]): string[] => {
	let currentIndex = pile.length;
	const newPile = pile.map(p => p);
	while (currentIndex != 0) {
		let randomIndex = Math.floor(Math.random() * currentIndex);
		currentIndex--;
		[newPile[currentIndex], newPile[randomIndex]] = [newPile[randomIndex], newPile[currentIndex]];
	}
	return newPile;
}

/**
 * Get strength of card out of its name
 * @param val card name composed of first letter color and strength of card
 * @returns strength of card
 */
export const getCardVal = (val: string) => {
    const newVal = Number(val.substring(1));
    return newVal === 0 ? 13 : newVal;
}

/**
 * Get essential information to play turn
 * @param players card stack of a player
 * @returns Object containing necessary informations to play turn
 */
export const getPlayers = (players: Array<string[]>): {p1: string[], p2: string[], c1: number, c2: number} => {
    return {
      p1: players[0].map(p => p),
      p2: players[1].map(p => p), 
      c1: getCardVal(players[0][0]),
      c2: getCardVal(players[1][0])
    }
}

/**
 * Compare cards to ascertain turn's winner
 * @param card1 
 * @param card2 
 * @returns turn's winner
 */
export const compareCards = (card1: number, card2: number) => {
	const diff = card1 - card2;
	if (diff > 0) return '1';
	if (diff < 0) return '2';
	return '0';
}

/**
 * Check if one of the players wins the game
 * @param p1 first player set of cards
 * @param p2 second player set of cards
 * @param result turn's winner
 * @returns name of game winner or empty string if there's none yet
 */
export const checkVictory = (p1: string[], p2: string[], result: string) => {
	if (p1.length === 1 && result !== '1') {
		return 'PLAYER 2';
	} else if (p2.length === 1 && result !== '2') {
		return 'PLAYER 1';
	}
	return '';
}

/**
 * Update players sets of card after turn's issue
 * @param p1 first player set of cards
 * @param p2 second player set of cards
 * @returns players sets of cards
 */
export const updatePlayers = (p1: string[], p2: string[]) => {
	let newPlayer1 = p1;
	let newPlayer2 = p2;
	newPlayer1.shift();
	newPlayer2.shift();
	return [newPlayer1, newPlayer2];
}