import React, { useEffect, useRef, useState } from "react";
import { Fade } from "react-bootstrap";
import CSS from "csstype";

function ConstructionAlert(props: any) {
	const showRef = useRef(false);
	const [show, setShow] = useState(showRef.current);

	function updateShow(val: boolean) {
		showRef.current = val;
		setShow(val);
	}

	useEffect(() => {
		props.onMount([show, updateShow]);
	});

	useEffect(() => {
		if (show) {
			setTimeout(() => {
				setShow(false);
				showRef.current = false;
			}, 2000);
		}
	}, [showRef.current]);
	const wrapperStyle: CSS.Properties = {
		position: "fixed",
		marginLeft: "auto",
		marginRight: "auto",
		width: "100%",
		zIndex: 999,
	};

	const alertStyle: CSS.Properties = {};
	return (
		<Fade in={show}>
			<div style={wrapperStyle}>
				<div className="alert alert-dark d-flex justify-content-center">
					This functionality is still under construction. Stay tuned for more!
				</div>
			</div>
		</Fade>
	);
}

export default ConstructionAlert;
