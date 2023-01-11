import React, { useState, useEffect, useRef } from "react";
import "./pokeStat.css";

function PokeStat(props: any) {
	const [isGray, setGray] = useState(true);

	useEffect(() => {
		props.onMount(setGray);
	});

	return (
		<div className="row d-flex flex-row justify-content-between">
			<div className="col-3">{props.name}</div>
			<div
				className={isGray ? "col-6 bg-gray my-1" : "col-6 bg-primary my-1"}
			></div>

			<div className="col-3 text-end">{props.val}</div>
		</div>
	);
}

export default PokeStat;
