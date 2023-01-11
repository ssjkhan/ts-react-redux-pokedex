import React, { useEffect, useState } from "react";
import CSS from "csstype";
import "./pokeSprite.css";

function PokeSprite(props: any) {
	const [isGray, setGray] = useState(true);
	const [isLoading, setLoading] = useState(true);

	const hiddenCSS: CSS.Properties = {
		display: "none",
	};

	useEffect(() => {
		props.onMount(setGray);
	});

	return (
		<>
			<img
				style={isLoading ? hiddenCSS : {}}
				className={isGray ? "pokeImg pokeImgGray" : "pokeImg"}
				src={props.sprite}
				onLoad={() => setLoading(false)}
			></img>
		</>
	);
}

export default PokeSprite;
