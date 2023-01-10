import React, { useState } from "react";
import TopBar from "./components/Topbar";
import PokeDisplay from "./components/PokeDisplay";
import ConstructionAlert from "./components/ConstructionAlert";
import "./styles/css/styles.css";

function App() {
	const [reloadApp, triggerReloadApp] = useState(false);
	let show: any = null;
	let setShow: any = null;

	const onAlertMount = (dataFromAlert: any) => {
		show = dataFromAlert[0];
		setShow = dataFromAlert[1];
	};

	const myArr: number[] = Array.from(Array.from({ length: 151 }).keys());
	return (
		<div className="App page-top bg-white">
			<TopBar
				underCon={() => {
					setShow(true);
				}}
			/>
			<ConstructionAlert onMount={onAlertMount}></ConstructionAlert>
			<div className="d-flex justify-content-center"></div>
			<div className="container justify-content-md-center">
				<div className="row">
					{myArr.map((_, index) => (
						<PokeDisplay
							key={index + 1}
							number={index + 1}
						/>
					))}
				</div>
			</div>
		</div>
	);
}

export default App;
