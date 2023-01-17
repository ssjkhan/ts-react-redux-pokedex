import { useEffect, useRef, useState } from "react";
import { Fade } from "react-bootstrap";
import CSS from "csstype";

function ConstructionAlert(props: any) {
  const showRef = useRef(false);
  const [show, setShow] = useState(showRef.current);

  function updateShow(val: boolean) {
    showRef.current = val;
    setShow(val);
  }

  const styleShow: CSS.Properties = {
    position: "fixed",
    margin: "auto",
    width: "100%",
    zIndex: 999,
  };

  const styleHidden: CSS.Properties = {
    display: "none !important",
    pointerEvents: "none",
    position: "absolute",
    top: "-9999px !important",
    left: "-9999px !important",
  };

  var wrapperStyle: CSS.Properties = show ? styleShow : styleHidden;

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
