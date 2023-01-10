import * as React from "react";
import logo from "../assets/pokeball.svg";
import CSS from "csstype";

type Props = {
	height?: string;
	width?: string;
	underCon: Function;
};

function PokeLogo(props: Props | any) {
	console.log(props);
	const height = props.height;
	const width = props.width;

	const logoStyle: CSS.Properties = {
		height: height ? height : "3rem",
		width: width ? width : "3rem",
		margin: "0",
	};
	return (
		<img
			onClick={props.underCon}
			id="poke-Logo"
			src={logo}
			style={logoStyle}
			alt="spinning pokeball"
		></img>
	);
}

export default PokeLogo;
