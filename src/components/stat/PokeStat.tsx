import { useEffect, useState } from "react";
import "./pokeStat.css";
import CSS from "csstype";

type Prop = {
  base_stat: number;
  effort: number;
  stat: {
    name: string;
    url: string;
  };
  onMount: Function;
};

function PokeStat(props: Prop) {
  const [isGray, setGray] = useState(true);
  const mapStatName: (name: string) => string = (name) => {
    switch (name) {
      case "hp":
        return "HP";
      case "attack":
        return "ATT";
      case "defense":
        return "DEF";
      case "special-attack":
        return "SATT";
      case "special-defense":
        return "SDEF";
      case "speed":
        return "SPD";
      default:
        return "";
    }
  };

  const statVal = Math.floor(Number(props.base_stat) / 160 * 100);

  const barStyle: CSS.Properties = {
    width: `${statVal}%`,
    maxHeight: `100%`,
    borderRadius: "0.25rem",
  };

  useEffect(() => {
    props.onMount(setGray);
  });

  return (
    <div className="row d-flex flex-row justify-content-between pokeStatRow">
      <div className="col-xl-3 col-2 text-capitalize mx-0 px-0">
        {mapStatName(props.stat.name)}
      </div>
      <div className="col-xl-7 col-9 mx-0 px-0 my-1">
        <div className="m-0 p-0">
          <div
            className={isGray ? "bg-gray child-gray" : "bg-color child-color"}
            style={barStyle}
          >
            -
          </div>
        </div>
      </div>

      <div className="col-xl-2 col-1 text-end mx-0 px-0">
        {props.base_stat}
      </div>
    </div>
  );
}

export default PokeStat;
