import * as React from "react";
import PokeStat from "./PokeStat";
function PokeStats() {
	return (
		<>
			<div className="container">
				<PokeStat {...{ name: "Stat", val: 55 }} />
				<PokeStat {...{ name: "Stat", val: 55 }} />
				<PokeStat {...{ name: "Stat", val: 55 }} />
				<PokeStat {...{ name: "Stat", val: 55 }} />
				<PokeStat {...{ name: "Stat", val: 55 }} />
				<PokeStat {...{ name: "Stat", val: 55 }} />
			</div>
		</>
	);
}

export default PokeStats;
