import * as React from "react";
import PokeStat from "./PokeStat";

function PokeStats(props: any) {
	return (
		<>
			<div className="container">
				<PokeStat {...{ name: "Stat", val: 55, onMount: props.onMount }} />
				<PokeStat {...{ name: "Stat", val: 55, onMount: props.onMount }} />
			</div>
		</>
	);
}

export default PokeStats;
