import PokeStat from "./PokeStat";

type Prop = {
  stats: {
    base_stat: number;
    effort: number;
    stat: {
      name: string;
      url: string;
    };
  }[];
  number: number;
  onMount: Function;
};

type Stat = Prop["stats"][0];

function PokeStats(props: Prop) {
  return (
    <>
      <div className="container">
        {props.stats.map((stat: Stat, index: number) => (
          <PokeStat
            key={`pokeNumber${props.number}-${index}`}
            {...{ onMount: props.onMount, ...stat }}
          />
        ))}
      </div>
    </>
  );
}

export default PokeStats;
