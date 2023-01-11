import * as React from "react";
import PokeStat from "./PokeStat";

function PokeStats(props: any) {
  return (
    <>
      <div className="container">
        {props.stats.map((stat: any, index: number) => (
          <PokeStat
            key={`pokeNumber${props.number}-${index}`}
            {...{ onMount: props.onMount, stat: stat }}
          />
        ))}
      </div>
    </>
  );
}

export default PokeStats;
