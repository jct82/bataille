type PlayerProps = { playerClass: string, player: string[] };

interface ColorMap {
	h: number,
	s: number,
	d: number,
	t: number
  }

export default function Player({playerClass, player}: PlayerProps) {
	const colorMap: ColorMap = {h:0,s:1,d:2,t:3};
	const nbVal = Number(player[0].substring(1)) * 8.333;
	const colorVal = colorMap[player[0].charAt(0) as keyof ColorMap] * 33.333;

	return (
		<div className={`player ${playerClass}`} style={{backgroundPosition:`${nbVal}% ${colorVal}%`}}>
			<span>{player.length}</span>
		</div>
	);
}
