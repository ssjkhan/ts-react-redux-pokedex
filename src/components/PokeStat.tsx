import * as React from "react";

type Props = {
	name: string;
	val: number;
};

function PokeStat(props: Props) {
	return (
		<div className="row d-flex flex-row justify-content-between">
			<div className="col-3">{props.name}</div>
			<div className="col-6 bg-primary my-1"></div>
			<div className="col-3 text-end">{props.val}</div>
		</div>
	);
}

export default PokeStat;
