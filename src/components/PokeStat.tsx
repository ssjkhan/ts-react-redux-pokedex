import React, { useEffect, useRef, useState } from "react";
import { ProgressBar } from "react-bootstrap";
import "./pokeStat.css";
import CSS from "csstype";
function PokeStat(props: any) {
  const [isGray, setGray] = useState(true);

  const mapStatName: (name: string) => string = (name) => {
    switch (name) {
      case "hp":
        return "HP";
        break;
      case "attack":
        return "ATT";
        break;
      case "defense":
        return "DEF";
        break;
      case "special-attack":
        return "SATT";
        break;
      case "special-defense":
        return "SDEF";
        break;
      case "speed":
        return "SPD";
        break;
      default:
        return "";
    }
  };

  const barClass: () => string = () => {
    var statVal: number = Math.floor(Number(props.stat.base_stat) / 120) * 100;
    var className: string = `w-${statVal} mx-0 px-0`;
    if (isGray) {
      className += " bg-gray";
    } else {
      className += " bg-primary";
    }
    return className;
  };

  const statVal = Math.floor(Number(props.stat.base_stat) / 125 * 100);

  const barStyle: CSS.Properties = {
    width: `${statVal}%`,
    maxHeight: `100%`,
    borderRadius: "0.25rem",
  };

  useEffect(() => {
    props.onMount(setGray);
  });

  return (
    <div className="row d-flex flex-row justify-content-between">
      <div className="col-xl-3 col-2 text-capitalize mx-0 px-0">
        {mapStatName(props.stat.stat.name)}
      </div>
      <div className="col-xl-6 col-8 mx-0 px-0 my-1">
        <div
          className={isGray ? "bg-gray" : "bg-color"}
          style={barStyle}
        >
          <div className={isGray ? "child-gray" : "child-color"}>-</div>
        </div>
      </div>

      <div className="col-xl-3 col-2 text-end mx-0 px-0">
        {props.stat.base_stat}
      </div>
    </div>
  );
}

export default PokeStat;
