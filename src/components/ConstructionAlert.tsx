import React, { useEffect, useRef, useState } from "react";
import { Fade } from "react-bootstrap";
import CSS from "csstype";

function ConstructionAlert(props: any) {
	const showRef = useRef(false);
	const [show, setShow] = useState(showRef.current);

	const updateShow = (val: boolean) => {
		showRef.current = val;
		setShow(val);
	};

	const alertStyles: CSS.Properties = {
		position: "absolute",
		zIndex: 999,
	};

	useEffect(() => {
		props.onMount([show, updateShow]);
	}, []);

	useEffect(() => {
		if (show) {
			setTimeout(() => {
				setShow(false);
				showRef.current = false;
			}, 2000);
		}
	}, [showRef.current]);

	return (
		<Fade in={show}>
			<div className="alert alert-primary d-flex justify-content-center position-absolute top-50 start-50 translate-middle ">
				This functionality is still under construction. Stay tuned for more!
			</div>
		</Fade>
	);
}

export default ConstructionAlert;
