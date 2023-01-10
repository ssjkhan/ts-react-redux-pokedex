import React from "react";
import Navbar from "react-bootstrap/Navbar";
import Logo from "./PokeLogo";
import CSS from "csstype";

type Props = {
	underCon: Function;
};
function TopBar(props: Props) {
	const logoStyle: CSS.Properties = {
		height: "3rem",
		width: "3rem",
		margin: "0",
	};

	const navStyle: CSS.Properties = {
		display: "flex",
		justifyContent: "center",
	};

	return (
		<>
			<Navbar
				bg="white"
				variant="light"
				className=""
				style={navStyle}
			>
				<div>
					<Logo
						underCon={() => {
							props.underCon();
						}}
					/>
				</div>
			</Navbar>
		</>
	);
}

export default TopBar;
