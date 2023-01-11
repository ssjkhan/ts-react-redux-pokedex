import * as React from "react";
import PokeStat from "./PokeStat";

function PokeStats(props: any) {
  return (
    <>
      <div className="container">
        {props.stats.map((stat: any) => (
          <PokeStat
            {...{ name: "Stat", val: 55, onMount: props.onMount, stat: stat }}
          />
        ))}
      </div>
    </>
  );
}

export default PokeStats;
